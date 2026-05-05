import { ForgotButton, HideButton, RememberButton, ShowButton } from "./flash-card-buttons";
import type { FC } from "react";

type FlashCardActionsProps = {
    showAnswer: boolean;
    onShow: () => void;
    onHide: () => void;
    onForget: () => void;
    onRemember: () => void;
};

export const FlashCardActions: FC<FlashCardActionsProps> = ({
    showAnswer,
    onShow,
    onHide,
    onForget,
    onRemember,
}) => {
    return (
        <div className="flex gap-3 bg-white p-4">
            <ForgotButton onClick={onForget}>Forget</ForgotButton>

            {showAnswer ? (
                <HideButton onClick={onHide}>Hide</HideButton>
            ) : (
                <ShowButton onClick={onShow}>Show</ShowButton>
            )}

            <RememberButton onClick={onRemember}>Remember</RememberButton>
        </div>
    );
};
