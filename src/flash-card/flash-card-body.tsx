import type { FC } from "react";
import { FlashCardFace } from "./flash-card-face";
import { FlashCardAnswer } from "./flash-card-answer";

type FlashCardBodyProps = {
    front: string;
    answer: string;
    isFlipped: boolean;
};

export const FlashCardBody: FC<FlashCardBodyProps> = ({
    front,
    answer,
    isFlipped,
}) => {
    return (
        <div className="relative flex-1 p-8 [perspective:1000px]">
            <div
                className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
                style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
                <FlashCardFace label="Question" className="items-center justify-center text-center">
                    <h1 className="text-3xl font-bold leading-tight text-slate-900">
                        {front}
                    </h1>
                </FlashCardFace>
                <FlashCardFace
                    label="Answer"
                    className="items-start justify-start overflow-auto [transform:rotateY(180deg)]"
                >
                    <FlashCardAnswer md={answer} />
                </FlashCardFace>
            </div>
        </div>
    );
};
