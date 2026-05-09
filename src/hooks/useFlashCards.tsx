import { useEffect, useState, useCallback } from "react";
import type { FlashCardProps } from "../flash-card/flash-card";
import type { IObsidianRepository } from "../obsidian/app";
import type { UIAPI } from "../obsidian/api";

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

                const forgotFiles = repository.findForgotFiles();
                const loadedCards = await Promise.all(
                    forgotFiles.map(async (file) => ({
                        id: file.name,
                        front: await repository.showQuizzFront(file),
                        answer: await repository.showQuizzBack(file),
                        onForget: async () => {
                            try {
                                await repository.forgot(file);
                            } catch (e) {
                                ui?.notice(`Error marking as forgot: ${e}`);
                            }
                        },
                        onRemember: async () => {
                            try {
                                await repository.remember(file);
                            } catch (e) {
                                ui?.notice(`Error marking as remembered: ${e}`);
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

    // Handle card action (remember/forget)
    const handleCardAction = useCallback(
        (card: FlashCardProps, remember: boolean) => {
            if (remember) {
                card.onRemember?.();
            } else {
                card.onForget?.();
            }
            // Remove the card from the stack
            setCards((prevCards) => prevCards.slice(1));
        },
        []
    );

    // Show answer in modal
    const showAnswerModal = useCallback(
        (card: FlashCardProps) => {
            ui?.markdownModal(card.answer).open();
        },
        [ui]
    );

    return {
        cards,
        isLoading,
        error,
        handleCardAction,
        showAnswerModal,
    };
};
