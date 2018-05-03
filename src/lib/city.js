import {allCities, oneCity} from "./elastic";

export const list = async () => {
  const data = await allCities();

  return data
    .reduce(
      (memo, u) =>
        u._sc_locations.reduce((acc, location) => {
          const existing = acc.find(
            e => e._sc_id_hash === location._sc_id_hash,
          );
          if (existing) {
            existing.units.push(u._sc_id_hash);
            return acc;
          }
          return memo.concat(
            Object.assign({}, location, {units: [u._sc_id_hash]}),
          );
        }, memo),
      [],
    )
    .map(u => {
      const {city, county, units} = u;
      const lat = parseFloat(u.lat, 10);
      const lng = parseFloat(u.lng, 10);
      return {
        city,
        county,
        lat,
        lng,
        units,
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
