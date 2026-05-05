import { useState, type FC } from "react";
import { FlashCardBody } from "./flash-card-body";
import { FlashCardActions } from "./flash-card-actions";

type CardData = {
    id: string;
    front: string;
    answer: string;
};

export type FlashCardProps = CardData & {
    onForget?: () => void;
    onRemember?: () => void;
};

const getSwipeStyle = (direction: "right" | "left" | null) => {
    if (direction === "left") {
        return {
            transform: "translateX(-520px) rotate(-24deg)",
            opacity: 0,
            transition: "transform 220ms ease-out, opacity 220ms ease-out",
        };
    }

    if (direction === "right") {
        return {
            transform: "translateX(520px) rotate(24deg)",
            opacity: 0,
            transition: "transform 220ms ease-out, opacity 220ms ease-out",
        };
    }

    return {
        transform: "translateX(0) rotate(0)",
        opacity: 1,
        transition: "transform 220ms ease-out, opacity 220ms ease-out",
    };
};


export const FlashCard: FC<FlashCardProps> = ({ front, answer, onForget, onRemember }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [flyDirection, setFlyDirection] =
        useState<"left" | "right" | null>(null);

    const swipeCard = (direction: "left" | "right") => {
        setFlyDirection(direction);

        window.setTimeout(() => {
            if (direction === "left") {
                onForget?.();
            } else {
                onRemember?.();
            }

            setFlyDirection(null);
        }, 220);
    };

    return (
        <div
            className="flex h-[560px] w-full flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl"
            style={getSwipeStyle(flyDirection)}
        >
            <FlashCardBody front={front} answer={answer} showAnswer={showAnswer} />
            <FlashCardActions
                showAnswer={showAnswer}
                onShow={() => setShowAnswer(true)}
                onHide={() => setShowAnswer(false)}
                onForget={() => swipeCard("left")}
                onRemember={() => swipeCard("right")}
            />
        </div>
    );
};



