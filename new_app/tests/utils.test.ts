import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("UI class composition", () => {
  it("allows callers to override conflicting Tailwind styles", () => {
    expect(cn("px-4 py-2", false && "hidden", { "font-medium": true }, "px-6"))
      .toBe("py-2 font-medium px-6");
  });
});
