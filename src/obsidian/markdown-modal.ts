import { App, Component, MarkdownRenderer, Modal, } from 'obsidian';

export class MarkdownModal extends Modal {
  private component = new Component();

  constructor(
    app: App,
    private readonly text: string
  ) {
    super(app);
  }

  public override onOpen = async () => {
    this.contentEl.empty();
    this.component.load();
    await MarkdownRenderer.render(
      this.app,
      this.text,
      this.contentEl,
      "",
      this.component,
    );
  }

  public override onClose = async () => {
    this.component.unload();
    this.contentEl.empty();
  }
}


