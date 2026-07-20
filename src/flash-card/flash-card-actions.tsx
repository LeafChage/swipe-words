import { AgainButton, EasyButton, GoodButton, HardButton, ShowButton } from "./flash-card-buttons";
import type { FC } from "react";
import type { Rating } from "../core/rating";

type FlashCardActionsProps = {
    onShow: () => void;
    onRate: (rating: Rating) => void;
};

export const FlashCardActions: FC<FlashCardActionsProps> = ({
    onShow,
    onRate,
}) => {
    return (
        <div className="flex flex-col gap-3 bg-white p-4">
            <ShowButton onClick={onShow}>Show</ShowButton>
            <div className="flex gap-2">
                <AgainButton onClick={() => onRate("again")}>Again</AgainButton>
                <HardButton onClick={() => onRate("hard")}>Hard</HardButton>
                <GoodButton onClick={() => onRate("good")}>Good</GoodButton>
                <EasyButton onClick={() => onRate("easy")}>Easy</EasyButton>
            </div>
        </div>
    );
};
