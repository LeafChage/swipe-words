import type { FC } from "react";
import { FlashCardFace } from "./flash-card-face";

type FlashCardBodyProps = {
    msg: string;
};

export const FlashCardBody: FC<FlashCardBodyProps> = ({
    msg,
}) => {
    return (
        <div className="relative flex-1 p-8 [perspective:1000px]">
            <div
                className={"relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"}
            >
                <FlashCardFace label="Question">
                    <h1 className="text-3xl font-bold leading-tight text-slate-900">
                        {msg}
                    </h1>
                </FlashCardFace>
            </div>
        </div>
    );
};

