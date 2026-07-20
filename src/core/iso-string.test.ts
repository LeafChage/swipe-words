import { describe, expect, test } from "bun:test";
import { ISOString } from "./iso-string";

describe("ISOString", () => {
  test("from", () => {
    const date = new Date("2026-07-20T03:04:05.000Z");
    expect(ISOString.from(date) as string).toBe("2026-07-20T03:04:05.000Z");
  })

  test("toDate", () => {
    const date = new Date("2026-07-20T03:04:05.000Z");
    const roundTripped = ISOString.toDate(ISOString.from(date));
    expect(roundTripped.getTime()).toBe(date.getTime());
  })

  test("is: accepts a full ISO timestamp", () => {
    expect(ISOString.is("2026-07-20T03:04:05.000Z")).toBeTrue();
  })

  test("is: rejects garbage strings", () => {
    expect(ISOString.is("not a date")).toBeFalse();
  })

  test("is: rejects non-strings", () => {
    expect(ISOString.is(undefined)).toBeFalse();
    expect(ISOString.is(123)).toBeFalse();
  })
})
