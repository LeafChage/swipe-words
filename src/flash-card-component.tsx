import { use, type FC } from "react";
import { FlashCardStack } from "./flash-card/flash-card-stack";
import { RepositoryContext, UIAPIContext } from "./obsidian/context";
import { useFlashCards } from "./hooks/useFlashCards";

export const FlashCardComponent: FC = () => {
    const repository = use(RepositoryContext);
    const ui = use(UIAPIContext);

    const { cards, isLoading, error, handleCardAction, showAnswerModal } =
        useFlashCards(repository, ui);

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
                <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
                    <h2 className="mb-2 text-2xl font-bold text-rose-600">Error</h2>
                    <p className="text-slate-500">{error}</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
                <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
                    <p className="text-slate-500">Loading cards...</p>
                </div>
            </div>
        );
    }

    return (
        <FlashCardStack
            cards={cards}
            onAction={handleCardAction}
            showAnswerModal={showAnswerModal}
        />
    );
};
