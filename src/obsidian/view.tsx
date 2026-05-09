import { ItemView, WorkspaceLeaf } from "obsidian";
import { App } from "../App";
import { createRoot, type Root } from "react-dom/client";
import { StrictMode } from "react";
import { RepositorynContext, UIAPIContext } from "./context";
import { ObsidianRepository } from "./app";
import type { OfferableSetting } from "@/main";
import { ObsidianUI } from "./api";

export const SwipeWordsViewType = "swipe-word-view"
export class SwipeWordsView extends ItemView {
    private root?: Root
    constructor(
        leaf: WorkspaceLeaf,
        private readonly plugin: OfferableSetting,
    ) {
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
                <RepositorynContext value={new ObsidianRepository(this.app, this.plugin)}>
                    <UIAPIContext value={new ObsidianUI(this.app)}>
                        <App />
                    </UIAPIContext>
                </RepositorynContext>
            </StrictMode>
        );
    }

    public override onClose = async () => {
        this.root?.unmount();
    }
}
