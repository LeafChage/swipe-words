import { Plugin } from 'obsidian';
import { SwipeWordsView, SwipeWordsViewType } from './obsidian/view';
import { DEFAULT_SETTINGS, type SwipeWordsPluginSettings } from './obsidian/settings';
import { SwipeWordsPluginSettingTab } from './obsidian/settings-tab';

export interface OfferableSetting {
  settings: Partial<SwipeWordsPluginSettings>;
}

export interface SaveableSetting extends OfferableSetting {
  saveSetting<
    K extends keyof SwipeWordsPluginSettings,
    V extends SwipeWordsPluginSettings[K]
  >(key: K, value: V): Promise<void>
}

export class SwipeWordsPlugin extends Plugin implements SaveableSetting {
  public settings: Partial<SwipeWordsPluginSettings> = {};

  public override onload = async () => {
    await this.loadSettings();

    this.registerView(SwipeWordsViewType, (leaf) => new SwipeWordsView(leaf, this));
    this.addCommand({
      id: "swipe-words-open-view",
      name: "Open Swipe words view",
      callback: () => {
        this.activateView();
      }
    })
    this.addSettingTab(new SwipeWordsPluginSettingTab(this.app, this))
  }

  public override onunload = async () => {
    this.app.workspace.detachLeavesOfType(SwipeWordsViewType);
  }

  public loadSettings = async () => {
    this.settings = Object.assign({},
      DEFAULT_SETTINGS,
      await this.loadData() as Partial<SwipeWordsPluginSettings>
    );
  }

  public saveSetting = async <
    K extends keyof SwipeWordsPluginSettings,
    V extends SwipeWordsPluginSettings[K]
  >(key: K, value: V): Promise<void> => {
    this.settings[key] = value;
    await this.saveData(this.settings);
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


