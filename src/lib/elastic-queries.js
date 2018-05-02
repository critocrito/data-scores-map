export const listCitiesQuery = () => ({
  query: {
    nested: {
      path: "$sc_locations",
      query: {
        exists: {field: "$sc_locations"},
      },
    },
  },
  _source: {
    includes: ["$sc_id_hash", "$sc_locations"],
    excludes: ["href_text"],
  },
});

export const showCityQuery = (city, county) => ({
  query: {
    nested: {
      path: "$sc_locations",
      query: {
        bool: {
          must: [
            {match_phrase: {"$sc_locations.city": city}},
            {match_phrase: {"$sc_locations.county": county}},
          ],
        },
      },
    },
  },
  _source: {
    excludes: ["href_text"],
  },
});
