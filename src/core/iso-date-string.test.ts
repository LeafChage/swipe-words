import { describe, expect, test } from "bun:test";
import { ISODateString } from "./iso-date-string";

describe("ISODateString", () => {
  test("from: formats using local date parts, zero-padded", () => {
    expect(ISODateString.from(new Date(2026, 6, 20)) as string).toBe("2026-07-20");
  })

  test("from: pads single-digit month and day", () => {
    expect(ISODateString.from(new Date(2026, 0, 5)) as string).toBe("2026-01-05");
  })

  test("toDate: returns local midnight for the given date", () => {
    const date = ISODateString.toDate(ISODateString.from(new Date(2026, 6, 20)));
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(6);
    expect(date.getDate()).toBe(20);
    expect(date.getHours()).toBe(0);
  })

  test("is: accepts YYYY-MM-DD", () => {
    expect(ISODateString.is("2026-07-20")).toBeTrue();
  })

  test("is: rejects a full ISO timestamp", () => {
    expect(ISODateString.is("2026-07-20T03:04:05.000Z")).toBeFalse();
  })

  test("is: rejects unpadded dates", () => {
    expect(ISODateString.is("2026-7-20")).toBeFalse();
  })

  test("is: rejects non-strings", () => {
    expect(ISODateString.is(undefined)).toBeFalse();
    expect(ISODateString.is(123)).toBeFalse();
  })
})
