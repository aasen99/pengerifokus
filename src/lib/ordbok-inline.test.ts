import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createOrdbokLinker } from "./ordbok-inline";

describe("createOrdbokLinker", () => {
  it("links the first matching terms and stops at the cap", () => {
    const link = createOrdbokLinker(2);
    const first = link("Han bygde egenkapital gjennom utbytte og inflasjon.");
    const second = link("Nettoformue og refinansiering kom senere.");

    assert.match(first, /\[egenkapital\]\(\/ordbok\/egenkapital\)/);
    assert.match(first, /\[utbytte\]\(\/ordbok\/utbytte\)/);
    assert.doesNotMatch(first, /\[inflasjon\]/);
    assert.equal(second, "Nettoformue og refinansiering kom senere.");
  });

  it("does not wrap text that is already a markdown link", () => {
    const link = createOrdbokLinker(2);
    const result = link("Se [egenkapital](/ordbok/egenkapital) og utbytte.");

    assert.equal(
      result,
      "Se [egenkapital](/ordbok/egenkapital) og [utbytte](/ordbok/utbytte).",
    );
  });
});
