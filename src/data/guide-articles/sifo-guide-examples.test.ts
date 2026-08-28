import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getSifoGuideExampleTotals } from "./sifo-guide-examples";

describe("sifo guide examples", () => {
  it("matcher kalkulatorens standardpresets for guidens eksempler", () => {
    const totals = getSifoGuideExampleTotals();

    assert.equal(totals.enslig, 12_599);
    assert.equal(totals.par, 21_678);
    assert.equal(totals.familie, 42_472);
  });
});
