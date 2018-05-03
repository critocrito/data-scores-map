import {allCities, oneCity} from "./elastic";

export const list = async () => {
  const data = await allCities();

  return data
    .reduce((memo, u) => {
      const unitKeywords = u._sc_keywords;

      return u._sc_locations.reduce((acc, location) => {
        const existing = acc.find(e => e._sc_id_hash === location._sc_id_hash);
        if (existing) {
          existing.unitsCount += 1;
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
            keywords: location.keywords,
            unitsByKeywords: unitKeywords.reduce((kw, k) => {
              if (k in kw) {
                return Object.assign(kw, {[k]: kw[k].concat(u._sc_id_hash)});
              }
              return Object.assign(kw, {[k]: [u._sc_id_hash]});
            }, {}),
            unitsCount: 1,
          }),
        );
      }, memo);
    }, [])
    .map(u => {
      const {city, county, keywords, unitsByKeywords, unitsCount} = u;
      const lat = parseFloat(u.lat, 10);
      const lng = parseFloat(u.lng, 10);
      return {
        city,
        county,
        lat,
        lng,
        keywords,
        unitsByKeywords,
        unitsCount,
        position: [lat, lng],
      };
    });
};

export const show = async (city, county) => {
  const data = await oneCity(city, county);
  if (data.length === 0) return {};
  const {lat, lng} = data[0]._sc_locations.find(
    e => e.city === city && e.county === county,
  );
  const units = data.map(u => {
    const unit = {
      id: u._sc_id_hash,
      keywords: u._sc_keywords,
      description: u.description,
      href: u.href,
      title: u.title,
      search_category: u.search_category,
    };
    return {
      keywords: u._sc_locations.find(
        e => e.city === city && e.county === county,
      ).keywords,
      ...unit,
    };
  });

  return {city, county, lat, lng, units};
};
