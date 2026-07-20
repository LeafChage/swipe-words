import type { Diff } from "./diff";
import { ISOString } from "./iso-string";
import { ISODateString } from "./iso-date-string";
import type { Rating } from "./rating";

export type ReviewLog = {
  cardId: string;
  reviewedAt: ISOString;
  rating: Rating;
  intervalDays: Diff<number>;
  ease: Diff<number>
  due: Diff<ISODateString>
};

const ReviewLog = {
  builder: (cardId: string) => {
    return {
      stampReviewedAt: function() {
        return this.reviewedAt(ISOString.from(new Date()));
      },
      reviewedAt: function(reviewedAt: ISOString) {
        return {
          rating: function(rating: Rating) {
            return {
              intervalDays: function(from: number | undefined, to: number) {
                const intervalDays = { from, to };
                return {
                  ease: function(from: number | undefined, to: number) {
                    const ease = { from, to };
                    return {
                      due: function(from: ISODateString | undefined, to: ISODateString) {
                        const due = { from, to };
                        return {
                          run: function(): ReviewLog {
                            return {
                              cardId,
                              reviewedAt,
                              rating,
                              intervalDays,
                              ease,
                              due,
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        };
      },
    }
  }
}

