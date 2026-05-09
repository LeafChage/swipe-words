import { Notice, type App } from "obsidian";
import { MarkdownModal } from "./markdown-modal";

type Open = () => void;
type Close = () => void;
export interface UIAPI {
  notice: (msg: string) => void;
  // @return closeFunction
  markdownModal: (md: string) => { open: Open, close: Close };
}

export class ObsidianUI implements UIAPI {
  public constructor(
    private readonly app: App
  ) {
  }

  public notice = (msg: string) => {
    new Notice(msg)
  }

  public markdownModal = (msg: string) => {
    return new MarkdownModal(this.app, msg)
  }
}
