import fs from "fs";
import path from "path";

const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      if (fullPath.includes(`${path.sep}tilbud`)) continue;
      walk(fullPath);
    } else if (/\.(ts|tsx)$/.test(entry.name) && !fullPath.includes("tilbud")) {
      files.push(fullPath);
    }
  }
}

walk("src");

function fixDashes(text) {
  const ranges = [];
  let s = text.replace(/(\d)–(\d)/g, (_, a, b) => {
    const token = `__RANGE_${ranges.length}__`;
    ranges.push(`${a}–${b}`);
    return token;
  });

  s = s.replace(
    /([.!?"']\s*|^|\n\s*"|heading: "|tip: ")([^"\n]{1,100}?) – ([a-zæøå«])/g,
    (match, prefix, label, rest) => {
      if (label.includes("__RANGE_")) return match;
      return `${prefix}${label}: ${rest}`;
    },
  );

  const replacements = [
    [/ – ikke /g, ", ikke "],
    [/ – og /g, ", og "],
    [/ – men /g, ", men "],
    [/ – uansett /g, ", uansett "],
    [/ – selv /g, ", selv "],
    [/ – for /g, ", for "],
    [/ – med /g, ", med "],
    [/ – uten /g, ", uten "],
    [/ – da /g, ". Da "],
    [/ – derfor /g, ". Derfor "],
    [/ – det /g, ". Det "],
    [/ – du /g, ". Du "],
    [/ – f\.eks\./g, ", f.eks."],
    [/ – over /g, ", over "],
    [/ – fordi /g, ", fordi "],
    [/ – risikerer/g, "; risikerer"],
    [/ – borettslag/g, "; borettslag"],
    [/ – streaming/g, ". Streaming"],
    [/ – trygghet/g, "; trygghet"],
    [/ – bedre /g, ", bedre "],
    [/ – avhengig/g, ", avhengig"],
    [/ – kanskje /g, ", kanskje "],
    [/ – særlig /g, ", særlig "],
    [/ – typisk /g, ", typisk "],
    [/ – lavere /g, ", lavere "],
    [/ – matematisk /g, ", matematisk "],
    [/ – motiverer/g, ", motiverer"],
    [/ – sparer/g, ", sparer"],
    [/ – ellers /g, ", ellers "],
    [/ – der /g, ", der "],
    [/ – det er /g, ". Det er "],
    [/ – lett /g, ", lett "],
    [/ – vurder /g, ", vurder "],
    [/ – sjekk /g, ", sjekk "],
    [/ – venter /g, ", venter "],
    [/ – sparing/g, ", sparing"],
    [/ – fond/g, ", fond"],
    [/ – hjemme/g, "; hjemme"],
    [/ – ofte /g, ", ofte "],
    [/ – fra /g, ", fra "],
    [/ – data /g, ", data "],
    [/ – brukes /g, ", brukes "],
    [/ – ingen /g, ", ingen "],
    [/ – banken /g, ". Banken "],
    [/ – bruk /g, ", bruk "],
    [/ – basert /g, ", basert "],
    [/ – se /g, ", se "],
    [/ – ikke bare /g, ", ikke bare "],
    [/ – ([A-ZÆØÅ])/g, ": $1"],
    [/ – /g, ", "],
  ];

  for (const [pattern, replacement] of replacements) {
    s = s.replace(pattern, replacement);
  }

  for (let i = 0; i < ranges.length; i += 1) {
    s = s.split(`__RANGE_${i}__`).join(ranges[i]);
  }

  return s;
}

let changed = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  if (!original.includes("–") && !original.includes("—")) continue;
  const updated = fixDashes(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changed += 1;
    console.log(file);
  }
}

console.log(`Changed ${changed} files`);
