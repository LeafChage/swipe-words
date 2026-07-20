import { useEffect, useState, useCallback } from "react";
import type { FlashCardProps } from "../flash-card/flash-card";
import type { IObsidianRepository } from "../obsidian/app";
import type { UIAPI } from "../obsidian/api";
import type { Rating } from "../core/rating";

export const useFlashCards = (
    repository: IObsidianRepository | undefined,
    ui: UIAPI | undefined
) => {
    const [cards, setCards] = useState<FlashCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load cards on mount or when repository changes
    useEffect(() => {
        if (!repository) {
            setIsLoading(false);
            return;
        }

        const loadCards = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const dueFiles = repository.findDueFiles();
                const loadedCards = await Promise.all(
                    dueFiles.map(async (file) => ({
                        id: file.path,
                        front: await repository.showQuizzFront(file),
                        answer: await repository.showQuizzBack(file),
                        onRate: async (rating: Rating) => {
                            try {
                                await repository.rate(file, rating);
                            } catch (e) {
                                ui?.notice(`Error rating card: ${e}`);
                            }
                        },
                    }))
                );

                setCards(loadedCards);
            } catch (e) {
                const errorMsg = e instanceof Error ? e.message : String(e);
                setError(errorMsg);
                console.error("Failed to load cards:", e);
            } finally {
                setIsLoading(false);
            }
        };

        loadCards();
    }, [repository, ui]);

    // Handle card action (rating)
    const handleCardAction = useCallback(
        (card: FlashCardProps, rating: Rating) => {
            card.onRate?.(rating);
            // Remove the card from the stack
            setCards((prevCards) => prevCards.slice(1));
        },
        []
    );

    return {
        cards,
        isLoading,
        error,
        handleCardAction,
    };
};
