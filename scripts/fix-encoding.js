const fs = require("fs");

function fix(file) {
  let s = fs.readFileSync(file, "utf8");
  // mojibake for en-dash, em-dash, middle dot, degree, >=
  s = s.replace(/â€“/g, "-");
  s = s.replace(/â€”/g, " - ");
  s = s.replace(/Â·/g, " · ");
  s = s.replace(/Â°/g, "°");
  s = s.replace(/â‰¥/g, ">=");
  // also raw utf8 sequences if double-encoded
  s = s.replace(/\u00e2\u20ac\u201c/g, "-");
  s = s.replace(/\u00e2\u20ac\u201d/g, " - ");
  s = s.replace(/\u00e2\u20ac\u2014/g, " - ");
  fs.writeFileSync(file, s);
  console.log("fixed", file);
}

fix("lib/trip-data.ts");
fix("app/layout.tsx");
fix("components/booking/SuccessView.tsx");
