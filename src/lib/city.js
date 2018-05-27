// @flow
import {allCities, oneCity} from "./elastic";
import type {Place} from "./types";

export const list = async (): Promise<Array<Place>> => {
  const data = await allCities();

  return data
    .reduce((memo, u) => {
      const unitKeywords = u._sc_keywords;

      return u._sc_locations.reduce((acc, location) => {
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
            id: location._sc_id_hash,
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
      const {id, city, county, keywords, unitsByKeywords, count} = u;
      const lat = parseFloat(u.lat);
      const lng = parseFloat(u.lng);
      return {
        id,
        county,
        keywords,
        unitsByKeywords,
        count,
        type: "city",
        name: city,
        position: [lat, lng],
      };
    });
};

export const show = async (
  name: string,
  county: string,
): Promise<Place | null> => {
  const data = await oneCity(name, county);
  if (data.length === 0) return null;

  const location = data[0]._sc_locations.find(
    e => e.city === name && e.county === county,
  );

  if (!location) return null;

  // eslint-disable-next-line camel-case
  const {lat, lng, keywords, unitsByKeywords} = location;

  return {
    id: location._sc_id_hash,
    name,
    county,
    keywords,
    unitsByKeywords,
    type: "city",
    count: data.length,
    position: [lat, lng],
  };
};
