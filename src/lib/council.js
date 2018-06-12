// @flow
import {allCouncils} from "./elastic";
import type {Council} from "./types";

const unitByKeywords = (keywords, id, seed) =>
  keywords.reduce((kw, k) => {
    if (k in kw) {
      return Object.assign(kw, {[k]: kw[k].concat(id)});
    }
    return Object.assign(kw, {[k]: [id]});
  }, seed);

export const list = async (): Promise<Array<Council>> => {
  const units = await allCouncils();

  return units.reduce(
    (memo, unit) =>
      memo.concat(
        unit._sc_council_areas.map(council => {
          const id = council._sc_id_hash;
          const name = council.council;
          const lat = parseFloat(council.lat);
          const lng = parseFloat(council.lng);
          const position = [lat, lng];
          const existing = memo.find(({id: existingId}) => existingId === id);
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
            unit._sc_keywords,
            unit._sc_id_hash,
            existing ? existing.unitsByKeywords : {},
          );
          return {id, position, name, count, keywords, unitsByKeywords};
        }),
      ),
    [],
  );
};
