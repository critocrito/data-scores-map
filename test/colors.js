import test from "ava";
import colors from "../src/lib/colors";

test("generate a color", t => {
  const [color, hoverColor] = colors("key");
  t.is(typeof color, "string");
  t.is(typeof hoverColor, "string");
});

test("generates the same color twice", t => {
  const [color, hoverColor] = colors("key");
  const [colorAlt, hoverColorAlt] = colors("key");
  t.is(color, colorAlt);
  t.is(hoverColor, hoverColorAlt);
});
