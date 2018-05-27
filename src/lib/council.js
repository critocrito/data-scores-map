// @flow
import {allCouncils} from "./elastic";
import type {Place} from "./types";

export const list = async (): Promise<Array<Place>> => {
  const data = await allCouncils();

  return data
    .reduce((memo, u) => {
      const unitKeywords = u._sc_keywords;

      return u._sc_council_areas.reduce((acc, location) => {
        const existing = acc.find(e => e._sc_id_hash === location._sc_id_hash);
        if (existing) {
          existing.count += 1;
          Object.assign(existing, {
            keywords: Array.from(
              unitKeywords.reduce(
                (kw, k) => kw.add(k),
                new Set(existing.keywords),
              ),
            ),
            unitsByKeywords: unitKeywords.reduce((kw, k) => {
              if (k in kw) {
                return Object.assign(kw, {[k]: kw[k].concat(u._sc_id_hash)});
              }
              return Object.assign(kw, {[k]: [u._sc_id_hash]});
            }, existing.unitsByKeywords),
          });
          return acc;
        }

        return memo.concat(
          Object.assign({}, location, {
            id: location.council,
            keywords: location.keywords,
            unitsByKeywords: unitKeywords.reduce((kw, k) => {
              if (k in kw) {
                return Object.assign(kw, {[k]: kw[k].concat(u._sc_id_hash)});
              }
              return Object.assign(kw, {[k]: [u._sc_id_hash]});
            }, {}),
            count: 1,
          }),
        );
      }, memo);
    }, [])
    .map(u => {
      const {id, council, keywords, unitsByKeywords, count} = u;
      const lat = parseFloat(u.lat);
      const lng = parseFloat(u.lng);
      return {
        id,
        keywords,
        unitsByKeywords,
        count,
        type: "council",
        name: council,
        position: [lat, lng],
      };
    });
};
