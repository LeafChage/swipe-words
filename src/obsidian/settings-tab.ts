import { App, PluginSettingTab, Setting } from "obsidian";
import { SwipeWordsPlugin, type SaveableSetting } from "../main";
import { FolderSuggestion } from "./folder-suggestion";

export class SwipeWordsluginSettingTab extends PluginSettingTab {
  private readonly plugin: SaveableSetting
  constructor(app: App, plugin: SwipeWordsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  public display = () => {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Quizz Directory")
      .addText(text => {
        const onChange = async (value: string) => {
          this.plugin.settings.quizzDirectory = value;
          await this.plugin.saveSetting("quizzDirectory", value.trim());
        };

        text.setPlaceholder("where is your quizz directory")
          .setValue(this.plugin.settings.quizzDirectory ?? "")
          .onChange(onChange)

        new FolderSuggestion(this.app, text.inputEl, onChange);
      });


    new Setting(containerEl)
      .setName("column")
      .setDesc("it can be used for turn on the column in the file attributes")
      .addText(text => text
        .setValue(this.plugin.settings.column ?? "")
        .onChange(async (value) => {
          await this.plugin.saveSetting("column", value.trim());
        })
      );
  }
}


