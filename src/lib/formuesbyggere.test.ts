import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getRelatedFormuesbyggerReason,
  getRelatedFormuesbyggere,
} from "./formuesbyggere";
import type { Formuesbygger } from "@/types/formuesbygger";
import { kapitalEstimate } from "./wealth-estimate";

function profile(
  slug: string,
  name: string,
  industry: Formuesbygger["industry"],
  buildType: Formuesbygger["buildType"],
  amount = "10",
): Formuesbygger {
  return {
    id: slug,
    slug,
    status: "published",
    name,
    region: "norsk",
    industry,
    buildType,
    tagline: `${name} tagline`,
    wealthEstimate: kapitalEstimate(amount),
    wealthContext: "Test",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  };
}

describe("getRelatedFormuesbyggere", () => {
  const current = profile("a", "Anna", "eiendom", "grunder", "20");
  const sameBoth = profile("b", "Bjarne", "eiendom", "grunder", "18");
  const sameIndustry = profile("c", "Cecilie", "eiendom", "selvskapt", "15");
  const sameBuild = profile("d", "Dag", "handel", "grunder", "12");
  const other = profile("e", "Eva", "sport", "investor", "50");
  const extra = profile("f", "Filip", "musikk", "merkevare", "8");
  const all = [current, sameBoth, sameIndustry, sameBuild, other, extra];

  it("prefers same industry, then same build type, and returns 3–5 profiles", () => {
    const related = getRelatedFormuesbyggere(current, all);
    assert.equal(related.length, 3);
    assert.deepEqual(
      related.map((entry) => entry.slug),
      ["b", "c", "d"],
    );
    assert.equal(related.some((entry) => entry.slug === "a"), false);
  });

  it("fills with other profiles when industry matches are few", () => {
    const sparse = [current, sameBoth, other, extra];
    const related = getRelatedFormuesbyggere(current, sparse);
    assert.equal(related.length, 3);
    assert.equal(related[0].slug, "b");
  });

  it("caps at five even when many share industry", () => {
    const many = [
      current,
      ...["b", "c", "d", "e", "f", "g"].map((slug, index) =>
        profile(slug, `Person ${slug}`, "eiendom", "grunder", String(10 - index)),
      ),
    ];
    const related = getRelatedFormuesbyggere(current, many);
    assert.equal(related.length, 5);
  });
});

describe("getRelatedFormuesbyggerReason", () => {
  it("describes shared industry and build type", () => {
    const current = profile("a", "Anna", "eiendom", "grunder");
    const related = profile("b", "Bjarne", "eiendom", "grunder");
    assert.equal(
      getRelatedFormuesbyggerReason(current, related),
      "Eiendom · Gründer",
    );
  });
});
