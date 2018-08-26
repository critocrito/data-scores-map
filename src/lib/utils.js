// @flow
export const toId = (key: string): string =>
  key
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

export const sourcify = (source: string): string => {
  switch (source) {
    default:
      return "Government Website";
  }
};

export const toAry = <T>(obj: T | Array<T>): Array<T> =>
  Array.isArray(obj) ? obj : [obj];
