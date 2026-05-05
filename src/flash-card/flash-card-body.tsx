import type { FC } from "react";
import { FlashCardFace } from "./flash-card-face";

type FlashCardBodyProps = {
    front: string;
    answer: string;
    showAnswer: boolean;
};

export const FlashCardBody: FC<FlashCardBodyProps> = ({
    front,
    answer,
    showAnswer,
}) => {
    return (
        <div className="relative flex-1 p-8 [perspective:1000px]">
            <div
                className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${showAnswer ? "[transform:rotateY(180deg)]" : ""}`}
            >
                <FlashCardFace label="Question">
                    <h1 className="text-3xl font-bold leading-tight text-slate-900">
                        {front}
                    </h1>
                </FlashCardFace>
                <FlashCardFace label="Answer" className="rounded-2xl bg-slate-50 p-6 [transform:rotateY(180deg)]" >
                    <p className="text-xl font-bold leading-relaxed text-slate-800">
                        {answer}
                    </p>
                </FlashCardFace>
            </div>
        </div>
    );
};

