import { type FC } from "react";
import { FlashCard, type FlashCardProps } from "./flash-card";
import { FlashCardEmpty } from "./flash-card-empty";

type FlashCardStackProps = {
    cards: FlashCardProps[];
    onAction: (card: FlashCardProps, remember: boolean) => void,
};

export const FlashCardStack: FC<FlashCardStackProps> = ({ cards, onAction }) => {
    const action = () => {
        onAction();
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
            {
                cards.length === 0 ?
                    <FlashCardEmpty /> :
                    <div className="relative h-[560px] w-full max-w-[420px]">
                        {cards.slice(0, 3).map((card, index) => {
                            const isTop = index === 0;
                            return (
                                <div
                                    key={card.id}
                                    className="absolute left-0 top-0 h-[560px] w-full transition-all duration-300 ease-out"
                                    style={{
                                        zIndex: cards.length - index,
                                        transform: `translate(${index * 10}px, ${index * 22}px) scale(${1 - index * 0.045})`,
                                        opacity: 1 - index * 0.08,
                                        pointerEvents: isTop ? "auto" : "none",
                                    }}
                                >
                                    <FlashCard
                                        id={card.id}
                                        front={card.front}
                                        answer={card.answer}
                                        onForget={() => onAction(card, false)}
                                        onRemember={() => onAction(card, true)}
                                    />
                                </div>
                            );
                        })}
                    </div>
            }
        </div>
    );
};

