import { describe, expect, test } from "bun:test";
import { DefaultEase, MinimumEase, EaseControlSmallGap, EaseControlBigGap, ReviewState } from "./review";
import { ISODateString } from "./iso-date-string";

const now = new Date(2026, 0, 10);

const stateWith = (intervalDays: number, ease: number): ReviewState => ({
  cardId: "card",
  due: ISODateString.from(now),
  intervalDays,
  ease,
});

describe("ReviewState", () => {
  describe("new", () => {
    test("is due immediately with default ease and zero interval", () => {
      const state = ReviewState.new("card", now);
      expect(state.due as string).toBe(ISODateString.from(now) as string);
      expect(state.intervalDays).toBe(0);
      expect(state.ease).toBe(DefaultEase);
    })
  })

  describe("updateSchedule", () => {
    describe("again", () => {
      test("resets the interval to 0 (due again today) and lowers ease", () => {
        const updated = ReviewState.updateSchedule(stateWith(5, DefaultEase), "again", now);
        expect(updated.intervalDays).toBe(0);
        expect(updated.ease).toBeCloseTo(DefaultEase - EaseControlBigGap);
        expect(updated.due as string).toBe(ISODateString.from(now) as string);
      })

      test("does not lower ease below the minimum", () => {
        const updated = ReviewState.updateSchedule(stateWith(5, MinimumEase), "again", now);
        expect(updated.ease).toBe(MinimumEase);
      })
    })

    describe("hard", () => {
      test("grows the interval by 1.2x and lowers ease slightly", () => {
        const updated = ReviewState.updateSchedule(stateWith(5, DefaultEase), "hard", now);
        expect(updated.intervalDays).toBe(6);
        expect(updated.ease).toBeCloseTo(DefaultEase - EaseControlSmallGap);
      })

      test("still schedules at least 1 day out for a brand-new card", () => {
        const updated = ReviewState.updateSchedule(stateWith(0, DefaultEase), "hard", now);
        expect(updated.intervalDays).toBe(1);
      })

      test("does not lower ease below the minimum", () => {
        const updated = ReviewState.updateSchedule(stateWith(5, MinimumEase), "hard", now);
        expect(updated.ease).toBe(MinimumEase);
      })
    })

    describe("good", () => {
      test("schedules a brand-new card 1 day out and keeps ease", () => {
        const updated = ReviewState.updateSchedule(stateWith(0, DefaultEase), "good", now);
        expect(updated.intervalDays).toBe(1);
        expect(updated.ease).toBe(DefaultEase);
      })

      test("multiplies the interval by ease", () => {
        const updated = ReviewState.updateSchedule(stateWith(5, DefaultEase), "good", now);
        expect(updated.intervalDays).toBe(13); // round(5 * 2.5) = round(12.5) = 13
        expect(updated.ease).toBe(DefaultEase);
      })
    })

    describe("easy", () => {
      test("schedules a brand-new card 4 days out and raises ease", () => {
        const updated = ReviewState.updateSchedule(stateWith(0, DefaultEase), "easy", now);
        expect(updated.intervalDays).toBe(4);
        expect(updated.ease).toBeCloseTo(DefaultEase + EaseControlSmallGap);
      })

      test("multiplies the interval by ease * 1.3", () => {
        const updated = ReviewState.updateSchedule(stateWith(5, DefaultEase), "easy", now);
        expect(updated.intervalDays).toBe(16); // round(5 * 2.5 * 1.3) = round(16.25) = 16
        expect(updated.ease).toBeCloseTo(DefaultEase + EaseControlSmallGap);
      })
    })

    describe("due", () => {
      test("is intervalDays after `now`", () => {
        const updated = ReviewState.updateSchedule(stateWith(0, DefaultEase), "good", now);
        expect(updated.due as string).toBe("2026-01-11");
      })
    })
  })
})
