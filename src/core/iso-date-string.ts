import { parseISO } from "date-fns";

export type ISODateString = string & {
  _ISODateString: never,
}

type Self = ISODateString;
export const ISODateString = {
  from: (date: Date): Self => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}` as Self;
  },
  toDate: (value: Self): Date => parseISO(value),
  is: (value: unknown): value is Self =>
    typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value),
} as const;
