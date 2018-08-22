// @flow
export const toId = (key: string): string =>
  key
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
