import type { TFile } from "obsidian";
import { addDays } from "date-fns";
import type { IObsidianRepository } from "@/obsidian/app";
import type { Rating } from "@/core/rating";
import { ReviewState } from "@/core/review";
import { ISODateString } from "@/core/iso-date-string";
import { XArray } from "@/x";

/**
 * Fixture shape for seeding LocalRepository — deliberately smaller than
 * TFile since nothing outside obsidian/app.ts and obsidian/x.ts touches
 * TFile fields besides `.name`/`.basename`/`.path` (see useFlashCards.tsx).
 */
export interface LocalCardFixture {
  basename: string;
  back: string;
  review?: ReviewState;
}

interface LocalCard {
  basename: string;
  back: string;
  review: ReviewState;
}

export const DEFAULT_LOCAL_FIXTURES: LocalCardFixture[] = [
  { basename: "apple", back: "- **意味**: りんご\n- **例文**: A common, round fruit with red, green, or yellow skin." },
  { basename: "run", back: "- **意味**: 走る (はしる)\n- **例文**: To move at a speed faster than a walk." },
  { basename: "library", back: "- **意味**: 図書館 (としょかん)\n- **例文**: A place where books are kept for people to read or borrow." },
  { basename: "beautiful", back: "- **意味**: 美しい (うつくしい)\n- **例文**: Pleasing to look at; attractive." },
  { basename: "decision", back: "- **意味**: 決断 (けつだん)\n- **例文**: A conclusion or resolution reached after consideration." },
  {
    basename: "not due yet example",
    back: "- **note**: This one is already scheduled a few days out, so it should not show up in the due list.",
    review: {
      ...ReviewState.new("not due yet example", new Date()),
      due: ISODateString.from(addDays(new Date(), 5)),
      intervalDays: 5,
    },
  },
];

// A fake TFile carries just enough shape for the UI to key off of
// (`.name`/`.basename`/`.path`); it is never passed through the real
// `obsidian` module, so it's safe to construct as a plain object and cast.
const toTFile = (card: LocalCard): TFile => ({
  path: card.basename,
  name: card.basename,
  basename: card.basename,
  extension: "md",
}) as unknown as TFile;

export class LocalRepository implements IObsidianRepository {
  private readonly cards: LocalCard[];

  public constructor(fixtures: LocalCardFixture[] = DEFAULT_LOCAL_FIXTURES) {
    this.cards = fixtures.map((f) => ({
      basename: f.basename,
      back: f.back,
      review: f.review ?? ReviewState.new(f.basename, new Date()),
    }));
  }

  private findCard = (file: TFile): LocalCard => {
    const card = this.cards.find((c) => c.basename === file.basename);
    if (!card) {
      throw `unknown card: ${file.basename}`;
    }
    return card;
  }

  public findAllFiles = (): TFile[] => {
    return this.cards.map(toTFile);
  }

  public findDueFiles = (): TFile[] => {
    const now = new Date();
    const due = this.cards.filter((c) => ISODateString.toDate(c.review.due) <= now);
    console.log("[LocalRepository] due:", due.map((c) => ({ basename: c.basename, ...c.review })));
    return XArray.shuffle(due).map(toTFile);
  }

  public rate = async (file: TFile, rating: Rating): Promise<void> => {
    const card = this.findCard(file);
    card.review = ReviewState.updateSchedule(card.review, rating, new Date());
    console.log("[LocalRepository] rated", rating, "->", card.basename, card.review);
  }

  public showQuizzFront = (file: TFile): Promise<string> => {
    return Promise.resolve(file.basename);
  }

  public showQuizzBack = (file: TFile): Promise<string> => {
    return Promise.resolve(this.findCard(file).back);
  }
}
