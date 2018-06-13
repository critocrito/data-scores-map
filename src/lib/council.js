// @flow
import {allCouncils} from "./elastic";
import {unitToDocument} from "./documents";
import type {Council} from "./types";

const unitByKeywords = (keywords, id, seed) =>
  keywords.reduce((kw, k) => {
    if (k in kw) {
      return Object.assign(kw, {[k]: Array.from(new Set(kw[k]).add(id))});
    }
    return Object.assign(kw, {[k]: [id]});
  }, seed);

export const list = async (): Promise<Array<Council>> => {
  const units = await allCouncils();

  return [
    ...units
      .reduce((memo, unit) => {
        const document = unitToDocument(unit);
        const councils = document.councils.map(council => {
          const existing = memo.get(council.id);
          const count = existing ? existing.count + 1 : 1;
          const keywords = existing
            ? Array.from(
                council.keywords.reduce(
                  (kw, k) => kw.add(k),
                  new Set(existing.keywords),
                ),
              )
            : council.keywords;
          const unitsByKeywords = unitByKeywords(
            council.keywords,
            document.id,
            existing ? existing.unitsByKeywords : {},
          );
          return Object.assign({}, council, {
            count,
            keywords,
            unitsByKeywords,
          });
        });
        councils.forEach(council => memo.set(council.id, council));
        return memo;
      }, new Map())
      .values(),
  ];
};
