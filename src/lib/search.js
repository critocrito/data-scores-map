// @flow
import {searchUnits} from "./elastic";
import {unitToDocument} from "./documents";
import type {Document} from "./types";

export const search = async (
  term: string,
  limit: number = 10,
): Promise<Array<Document>> => {
  const data = await searchUnits(term, limit);
  return data.map(unit => {
    // Tighten the highlighted snippet and remove excessive whitespace.
    const highlights = Object.keys(unit._sc_elastic_highlights).reduce(
      (memo, key) =>
        Object.assign(memo, {
          [key]: unit._sc_elastic_highlights[key].map(s =>
            s.replace(/\s\s*/g, " ").trim(),
          ),
        }),
      {},
    );
    return Object.assign({}, unitToDocument(unit), {highlights});
  });
};
