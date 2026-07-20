import type { OfferableSetting } from "@/main";
import type { App, TFile } from "obsidian";
import { File } from "./x";
import { XArray } from "@/x";
import { ReviewState } from "@/core/review";
import type { Rating } from "@/core/rating";
import { ISODateString } from "@/core/iso-date-string";

export interface IObsidianRepository {
  findAllFiles: () => TFile[],
  findDueFiles: () => TFile[],
  rate: (file: TFile, rating: Rating) => Promise<void>,
  showQuizzFront: (file: TFile) => Promise<string>,
  showQuizzBack: (file: TFile) => Promise<string>,
}

// frontmatter keys ReviewState is persisted under
const DUE_KEY = "sw-due";
const INTERVAL_KEY = "sw-interval";
const EASE_KEY = "sw-ease";

// frontmatter keys a card's front/back are read from
const FRONT_KEY = "front";
const BACK_PREFIX = "back-";

export class ObsidianRepository implements IObsidianRepository {
  public constructor(
    private readonly app: App,
    private readonly plugin: OfferableSetting,
  ) {
  }

  public findAllFiles = (): TFile[] => {
    const promptDir = this.app.vault.getAbstractFileByPath(this.plugin.settings.quizzDirectory ?? "");
    if (!File.isFolder(promptDir)) {
      return [];
    }
    return File.loadFilesInFolder(promptDir);
  }

  private readReviewState = (file: TFile): ReviewState => {
    const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
    const due = fm?.[DUE_KEY];
    const intervalDays = fm?.[INTERVAL_KEY];
    const ease = fm?.[EASE_KEY];

    if (ISODateString.is(due) && typeof intervalDays === "number" && typeof ease === "number") {
      return { cardId: file.path, due, intervalDays, ease };
    }
    // never reviewed yet -> treat as due immediately
    return ReviewState.new(file.path, new Date());
  }

  public findDueFiles = (): TFile[] => {
    const now = new Date();
    return XArray.shuffle(this.findAllFiles().filter((file) => {
      const state = this.readReviewState(file);
      return ISODateString.toDate(state.due) <= now;
    }))
  }

  public rate = async (file: TFile, rating: Rating): Promise<void> => {
    const current = this.readReviewState(file);
    const updated = ReviewState.updateSchedule(current, rating, new Date());

    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm[DUE_KEY] = updated.due;
      fm[INTERVAL_KEY] = updated.intervalDays;
      fm[EASE_KEY] = updated.ease;
    });
  }

  public showQuizzFront = (file: TFile): Promise<string> => {
    const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
    return Promise.resolve(fm?.[FRONT_KEY]);
  }

  public showQuizzBack = (file: TFile): Promise<string> => {
    const fm = this.app.metadataCache.getFileCache(file)?.frontmatter ?? {};
    const text = Object.keys(fm)
      .filter((key) => key.startsWith(BACK_PREFIX))
      .map((key) => `- **${key.slice(BACK_PREFIX.length)}**: ${fm[key]}`)
      .join("\n");
    return Promise.resolve(text);
  }
}

