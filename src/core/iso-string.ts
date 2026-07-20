import { parseISO } from "date-fns";

export type ISOString = string & {
  _ISOSTring: never,
}

type Self = ISOString;
export const ISOString = {
  from: (date: Date): Self => {
    return date.toISOString() as ISOString;
  },
  toDate: (value: Self): Date => parseISO(value),
  is: (value: unknown): value is Self =>
    typeof value === "string" && !Number.isNaN(Date.parse(value)),
} as const;
