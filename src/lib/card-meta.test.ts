import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getCardMeta, yearFromUpdatedAt } from "./card-meta";

describe("getCardMeta", () => {
  it("skips a tag that duplicates the category case-insensitively", () => {
    const meta = getCardMeta("Bank", ["bank", "dnb", "nordea"], {
      type: "Guide",
      year: "2026-07-02",
    });
    assert.equal(meta.category, "Bank");
    assert.equal(meta.secondary, "dnb");
  });

  it("skips kredittkort when category is Kredittkort", () => {
    const meta = getCardMeta("Kredittkort", ["kredittkort", "debetkort"], {
      type: "Guide",
    });
    assert.equal(meta.secondary, "debetkort");
  });

  it("falls back to content type when every tag duplicates the category", () => {
    const meta = getCardMeta("Bank", ["bank", "Bank"], { type: "Guide" });
    assert.equal(meta.secondary, "Guide");
  });

  it("falls back to year when tags duplicate and type is missing", () => {
    const meta = getCardMeta("Bank", ["bank"], { year: "2026-07-02" });
    assert.equal(meta.secondary, "2026");
  });

  it("keeps a distinct first tag", () => {
    const meta = getCardMeta("Sparing", ["buffer", "nødfond"], {
      type: "Guide",
    });
    assert.equal(meta.secondary, "buffer");
  });
});

describe("yearFromUpdatedAt", () => {
  it("reads the year from an ISO date", () => {
    assert.equal(yearFromUpdatedAt("2026-07-02"), "2026");
  });
});
