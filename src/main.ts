import { Plugin } from 'obsidian';
import { SwipeWordsView, SwipeWordsViewType } from './obsidian/view';

export class SwipeWordsPlugin extends Plugin {
  public override onload = async () => {
    await this.loadSettings();
    // this.appHelper = new AppHelper(this.app);

    this.registerView(SwipeWordsViewType, (leaf) => new SwipeWordsView(leaf));
    this.addRibbonIcon("dice", "Swipe Word", () => {
      console.log("onload");
      this.activateView();
    });

    this.addCommand({
      id: "swipe-words-open-view",
      name: "Open Swipe words view",
      callback: () => {
        this.activateView();
      }
    })
  }

  public override onunload = async () => {
    this.app.workspace.detachLeavesOfType(SwipeWordsViewType);
  }

  public loadSettings = async () => {
  }

  public saveSettings = async () => {
  }

  public activateView = async () => {
    this.app.workspace.detachLeavesOfType(SwipeWordsViewType);

    const leaf = this.app.workspace.getLeaf("tab")
    if (!leaf) return;

    await leaf.setViewState({
      type: SwipeWordsViewType,
      active: true,
    });

    this.app.workspace.revealLeaf(leaf);

  }
}

export default SwipeWordsPlugin;


