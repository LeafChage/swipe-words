import { Notice, type App } from "obsidian";

export interface UIAPI {
  notice: (msg: string) => void;
}

export class ObsidianUI implements UIAPI {
  public constructor(
  ) {
  }

  public notice = (msg: string) => {
    new Notice(msg)
  }
}
