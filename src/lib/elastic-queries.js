// @flow
export type ElasticQuery = {
  query: {},
  _source: {},
};

export const listCitiesQuery = (): ElasticQuery => ({
  query: {
    nested: {
      path: "$sc_locations",
      query: {
        exists: {field: "$sc_locations"},
      },
    },
  },
  _source: {
    includes: ["$sc_id_hash", "$sc_locations", "$sc_keywords"],
    excludes: ["href_text"],
  },
});

export const showCityQuery = (city: string, county: string): ElasticQuery => ({
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

export const listUnitsQuery = (ids: Array<string>): ElasticQuery => {
  const qs = ids.length === 0 ? {match_all: {}} : {ids: {values: ids}};
  return {
    query: {
      nested: {
        path: "$sc_locations",
        query: {
          bool: {
            must: [{exists: {field: "$sc_locations"}}, qs],
          },
        },
      },
    },
    _source: {
      excludes: ["href_text"],
    },
  };
};
