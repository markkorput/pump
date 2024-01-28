import { describe, expect, test } from "vitest";
import { formatTime } from "..";

describe("format", () => {
  describe("formatTime", () => {
    test("shows minutes, seconds and milliseconds", async () => {
      expect(formatTime(1000 * 63 + 250)).toEqual("01:03:2");
    });
  });
});
