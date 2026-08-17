import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateEksempelfamilieNordmann } from "./sifo";

describe("calculateEksempelfamilieNordmann", () => {
  it("matcher tallene i SIFO-rapport 9-2026 kap. 2.3", () => {
    const result = calculateEksempelfamilieNordmann();
    assert.ok(result);

    assert.equal(result.individTotal, 28_543);
    assert.equal(result.husholdTotal, 8_895);
    assert.equal(result.monthlyTotal, 37_438);
    assert.equal(result.yearlyTotal, 449_256);
  });
});
