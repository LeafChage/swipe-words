import { ItemView, WorkspaceLeaf } from "obsidian";
import { App } from "../App";
import { createRoot, type Root } from "react-dom/client";
import { StrictMode } from "react";

export const SwipeWordsViewType = "swipe-word-view"
export class SwipeWordsView extends ItemView {
    private root?: Root
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    public override getViewType() {
        return SwipeWordsViewType;
    }

    public getDisplayText = () => {
        return "Swipe Words";
    }

    public override onOpen = async () => {
        const rootEl = this.containerEl.createDiv({ cls: "swipe-word-root" })
        this.root = createRoot(rootEl);
        this.root.render(
            <StrictMode>
                <App />
            </StrictMode>
        );
    }

    public override onClose = async () => {
        this.root?.unmount();
    }
}
