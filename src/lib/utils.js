// @flow
export const toId = (key: string): string =>
  key
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

export const sourcify = (source: string): string => {
  switch (source) {
    case "government website":
      return ".gov.uk";
    case "auxiliary website":
      return ".gov.uk";
    case "media website":
      return "Media";
    case "foi":
      return "FOI request";
    default:
      return "unknown";
  }
};

export const toAry = <T>(obj: T | Array<T>): Array<T> =>
  Array.isArray(obj) ? obj : [obj];
