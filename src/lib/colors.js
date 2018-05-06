// @flow
import randomcolor from "randomcolor";

type ColorTuple = [string, string];

const hexToRgba = (hex: string): [number, number, number] => {
  const value = hex[0] === "#" ? hex.slice(1) : hex;
  const r = parseInt(value.substring(0, 1) + value.substring(0, 1), 16);
  const g = parseInt(value.substring(1, 2) + value.substring(1, 2), 16);
  const b = parseInt(value.substring(2, 3) + value.substring(2, 3), 16);
  return [r, g, b];
};

const randomRgbas = (luminosity = "dark"): ColorTuple => {
  const [r, g, b] = hexToRgba(randomcolor({luminosity}));
  return [`rgba(${r},${g},${b},1)`, `rgba(${r},${g},${b},.4)`];
};

export default (() => {
  const cache: {[string]: ColorTuple} = {};

  return (name: string): ColorTuple => {
    if (!(name in cache)) cache[name] = randomRgbas();
    return cache[name];
  };
})();
