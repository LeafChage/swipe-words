import { addDays } from "date-fns"
import type { Rating } from "./rating";
import { ISODateString } from "./iso-date-string";

export type ReviewState = {
  cardId: string;

  due: ISODateString;

  intervalDays: number;

  /**
   * @description
   * how easy to remember
   * if the words become "good", the word show up in intervalDays * ease
   */
  ease: number;
};

export const DefaultEase = 2.5
export const MinimumEase = 1.3
export const EaseControlSmallGap = 0.15
export const EaseControlBigGap = 0.2

const updateIntervalAndEase = ({ intervalDays, ease }: Pick<ReviewState, "intervalDays" | "ease">, rating: Rating): Pick<ReviewState, "intervalDays" | "ease"> => {
  switch (rating) {
    case "again": {
      return {
        intervalDays: 0,
        ease: Math.max(MinimumEase, ease - EaseControlBigGap)
      }
    }
    case "hard": {
      return {
        intervalDays: Math.max(1, Math.round(intervalDays * 1.2)),
        ease: Math.max(MinimumEase, ease - EaseControlSmallGap)
      }
    }
    case "good": {
      return {
        intervalDays: intervalDays === 0 ? 1 : Math.round(intervalDays * ease),
        ease: ease
      }
    }
    case "easy": {
      return {
        intervalDays: intervalDays === 0 ? 4 : Math.round(intervalDays * ease * 1.3),
        ease: ease + EaseControlSmallGap
      }
    }
  }
}

export const ReviewState = {
  /**
   * @returns a fresh, never-reviewed schedule that is due immediately
   */
  new: (cardId: string, now: Date): ReviewState => ({
    cardId,
    due: ISODateString.from(now),
    intervalDays: 0,
    ease: DefaultEase,
  }),

  /**
   * @returns new schedule updated with rating
   */
  updateSchedule: (card: ReviewState, rating: Rating, now: Date): ReviewState => {
    const { intervalDays, ease } = updateIntervalAndEase(card, rating);

    return {
      ...card,
      intervalDays,
      ease,
      due: ISODateString.from(addDays(now, intervalDays))
    };
  }
} as const;

