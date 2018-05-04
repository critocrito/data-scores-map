import test from "ava";
import colors from "../src/lib/colors";

test("generate a color", t => {
  const [color, hoverColor] = colors();
  t.is(typeof color, "string");
  t.is(typeof hoverColor, "string");
});

test("generates the same color twice", t => {
  const [color, hoverColor] = colors();
  const [colorAlt, hoverColorAlt] = colors();
  t.is(color, colorAlt);
  t.is(hoverColor, hoverColorAlt);
});

test("generates equal color based on index", t => {
  const [color, hoverColor] = colors(5);
  const [colorAlt, hoverColorAlt] = colors(5);
  t.is(color, colorAlt);
  t.is(hoverColor, hoverColorAlt);
});
