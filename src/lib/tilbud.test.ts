import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { tilbud } from "../data/tilbud";
import {
  TILBUD_PAGE_SIZE,
  filterTilbud,
  groupTilbudByPartner,
  paginateGruppertTilbud,
  parseOfferRate,
} from "./tilbud";
import { buildTilbudHref } from "./tilbud-ui";

describe("parseOfferRate", () => {
  it("returns max percent for rabatt labels", () => {
    assert.equal(parseOfferRate("15–20 % rabatt"), 20);
    assert.equal(parseOfferRate("30 % rabatt"), 30);
  });

  it("returns Trumf bonus percent as-is", () => {
    assert.equal(parseOfferRate("12,4 % Trumf-bonus"), 12.4);
  });

  it("converts EuroBonus poeng per 100 kr to ca. kr-verdi (prosent)", () => {
    assert.equal(parseOfferRate("50 poeng / 100 kr", "eurobonus"), 5);
    assert.equal(parseOfferRate("100 poeng / 100 kr", "eurobonus"), 10);
    assert.equal(parseOfferRate("Opptil 50 poeng / 100 kr", "eurobonus"), 5);
    assert.equal(parseOfferRate("50–60 poeng / 100 kr", "eurobonus"), 6);
  });

  it("converts Spenn poeng per 100 kr the same way", () => {
    assert.equal(parseOfferRate("40 poeng / 100 kr", "spenn"), 4);
    assert.ok(
      Math.abs((parseOfferRate("3,8 Spenn / 10 kr", "spenn") ?? 0) - 3.8) <
        1e-9,
    );
    assert.ok(
      Math.abs((parseOfferRate("Opptil 2,4 Spenn / 10 kr", "spenn") ?? 0) - 2.4) <
        1e-9,
    );
  });

  it("returns raw poeng for unknown programs", () => {
    assert.equal(parseOfferRate("50 poeng / 100 kr"), 50);
    assert.equal(parseOfferRate("3,8 Spenn / 10 kr"), 38);
  });

  it("ignores flat EuroBonus poeng without purchase amount", () => {
    assert.equal(parseOfferRate("500 poeng", "eurobonus"), null);
    assert.equal(parseOfferRate("1 500 poeng", "eurobonus"), null);
    assert.equal(parseOfferRate("3 000 poeng", "eurobonus"), null);
  });

  it("ignores flat Spenn without purchase amount", () => {
    assert.equal(parseOfferRate("816 Spenn på kjøpet", "spenn"), null);
    assert.equal(parseOfferRate("1 680 Spenn på kjøpet", "spenn"), null);
  });
});

describe("buildTilbudHref", () => {
  it("builds query URLs and omits default sort", () => {
    assert.equal(buildTilbudHref({ q: "hotell" }), "/tilbud?q=hotell");
    assert.equal(
      buildTilbudHref({
        q: "hotell",
        program: "obos",
        kategori: "Reise og hotell",
        student: true,
        sortering: "name-asc",
        side: 2,
      }),
      "/tilbud?q=hotell&program=obos&kategori=Reise+og+hotell&student=1&sortering=name-asc&side=2",
    );
  });
});

describe("filterTilbud search", () => {
  const published = tilbud.filter((item) => item.status === "published");

  it("does not match sko inside betalingskort boilerplate", () => {
    const matches = filterTilbud(published, "sko", null, null, false);
    assert.ok(!matches.some((item) => item.partner === "Wolt"));
  });

  it("matches partner names as word prefixes", () => {
    const matches = filterTilbud(published, "sko", null, null, false);
    assert.ok(matches.some((item) => item.partner === "Skousen"));
  });

  it("still matches multi-word queries", () => {
    const matches = filterTilbud(published, "obos hotell", null, null, false);
    assert.ok(matches.length > 0);
    assert.ok(matches.every((item) => item.fordelSlug === "obos"));
  });

  it("matches hidden searchTags", () => {
    const matches = filterTilbud(published, "sko", null, null, false);
    assert.ok(matches.some((item) => item.partner === "Anton Sport"));
  });
});

describe("default tilbud grouping", () => {
  const published = tilbud.filter((item) => item.status === "published");
  const grouped = groupTilbudByPartner(
    filterTilbud(published, "", null, null, false),
  );

  it("has partner cards on the default grouping", () => {
    assert.ok(grouped.length > 0);
    assert.ok(grouped.every((group) => group.offers.length > 0));
  });

  it("paginates default grouping instead of returning every card", () => {
    assert.ok(TILBUD_PAGE_SIZE >= 24 && TILBUD_PAGE_SIZE <= 36);
    const page = paginateGruppertTilbud(grouped, 1);
    assert.ok(page.items.length > 0);
    assert.ok(page.items.length <= TILBUD_PAGE_SIZE);
    assert.ok(page.pageCount >= 1);
    assert.ok(page.items.length < grouped.length || grouped.length <= TILBUD_PAGE_SIZE);
  });
});
