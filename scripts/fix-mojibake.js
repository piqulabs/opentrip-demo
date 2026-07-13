const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "lib", "trip-data.ts");
let s = fs.readFileSync(file, "utf8");

// Mojibake for → (UTF-8 C3 A2 E2 80 A0 E2 80 99 misread patterns)
// Common display: â†’
s = s.split("â†’").join(" -> ");
// Mojibake for ↔
s = s.split("â†”").join(" <-> ");

// Also fix if actual UTF-8 arrow bytes got corrupted differently
s = s.replace(/\u00e2\u2020\u2019/g, " -> ");
s = s.replace(/\u00e2\u2020\u201d/g, " <-> ");

fs.writeFileSync(file, s, "utf8");

const bad = (s.match(/â|†/g) || []).length;
console.log("remaining mojibake markers:", bad);
console.log(
  s
    .split("\n")
    .filter((l) => /title:|Transfer hotel/.test(l))
    .filter((l) => /Padar|Siaba|Labuan Bajo|Transfer/.test(l))
    .join("\n"),
);
