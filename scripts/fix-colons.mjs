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

function fixColons(text) {
  let s = text;

  const replacements = [
    [/ –\s*$/gm, "."],
    [/ –$/gm, "."],
    [/: og /g, ", og "],
    [/: ikke /g, ", ikke "],
    [/: men /g, ", men "],
    [/: uten /g, ", uten "],
    [/: fra /g, ", fra "],
    [/: med /g, ", med "],
    [/: selv /g, ", selv "],
    [/: for eksempel/g, ", for eksempel"],
    [/: det /g, ", det "],
    [/: du /g, ", du "],
    [/: da /g, ". Da "],
    [/: bruk /g, ", bruk "],
    [/: basert /g, ", basert "],
    [/: se /g, ". Se "],
    [/: ingen /g, ", ingen "],
    [/: hva /g, ", hva "],
    [/: fordi /g, ", fordi "],
    [/: over /g, ", over "],
    [/: kanskje /g, ", kanskje "],
    [/: dette /g, ", dette "],
    [/: det viktigste/g, ". Det viktigste"],
    [/: men bare /g, ", men bare "],
    [/: men i /g, ", men i "],
    [/: f\.eks\. /g, ", f.eks. "],
  ];

  for (const [pattern, replacement] of replacements) {
    s = s.replace(pattern, replacement);
  }

  return s;
}

let changed = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const updated = fixColons(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changed += 1;
    console.log(file);
  }
}

console.log(`Fixed ${changed} files`);
