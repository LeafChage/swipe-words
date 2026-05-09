import { use, useEffect, useState, type FC } from "react";
import { FlashCardStack } from "./flash-card/flash-card-stack";
import type { FlashCardProps } from "./flash-card/flash-card";
import { RepositorynContext, UIAPIContext } from "./obsidian/context";

export const FlashCardComponent: FC = () => {
    const obsidian = use(RepositorynContext);
    const ui = use(UIAPIContext);
    const [cards, setCards] = useState<FlashCardProps[]>([]);

    useEffect(() => {
        Promise.all(obsidian?.findForgotFiles().map(async file => {
            return {
                id: file.name,
                front: await obsidian?.showQuizzFront(file),
                answer: await obsidian?.showQuizzBack(file),
                onForget: async () => {
                    try {
                        await obsidian?.forgot(file);
                    } catch (e) {
                        ui?.notice(`${e}`);
                    }
                },
                onRemember: async () => {
                    try {
                        await obsidian?.remember(file);
                    } catch (e) {
                        ui?.notice(`${e}`);
                    }
                },
            };
        }) ?? [])
            .then((files) => setCards(files))
            .catch(e => {
                console.error(e);
            });
    }, [obsidian]);

    const onAction = (card: FlashCardProps, remember: boolean) => {
        if (remember) {
            card.onRemember?.();
        } else {
            card.onForget?.();
        }
        setCards([...cards.slice(1)])
    }
    const showAnswerModal = (card: FlashCardProps) => {
        ui?.markdownModal(card.answer).open();
    }
    return <FlashCardStack cards={cards} onAction={onAction} showAnswerModal={showAnswerModal} />
}
