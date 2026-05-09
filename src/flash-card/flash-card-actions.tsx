import { ForgotButton, HideButton, RememberButton, ShowButton } from "./flash-card-buttons";
import type { FC } from "react";

type FlashCardActionsProps = {
    onShow: () => void;
    onForget: () => void;
    onRemember: () => void;
};

export const FlashCardActions: FC<FlashCardActionsProps> = ({
    onShow,
    onForget,
    onRemember,
}) => {
    return (
        <div className="flex gap-3 bg-white p-4">
            <ForgotButton onClick={onForget}>Forget</ForgotButton>
            <ShowButton onClick={onShow}>Show</ShowButton>
            <RememberButton onClick={onRemember}>Remember</RememberButton>
        </div>
    );
};
