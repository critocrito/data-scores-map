// @flow
export type ElasticQuery = {
  query: {},
  _source: {},
};

const unitIncludes = [
  "$sc_id_hash",
  "title",
  "description",
  "href",
  "search_category",
  "$sc_keywords",
  "$sc_locations",
  "$sc_council_areas",
];

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
      includes: unitIncludes,
    },
  };
};

export const listCouncilsQuery = (): ElasticQuery => ({
  query: {
    nested: {
      path: "$sc_council_areas",
      query: {
        exists: {field: "$sc_council_areas"},
      },
    },
  },
  _source: {
    includes: ["$sc_id_hash", "$sc_council_areas", "$sc_keywords"],
    excludes: ["href_text"],
  },
});

export const searchUnitsQuery = (term: string): ElasticQuery => ({
  query: {
    multi_match: {
      query: term,
      fields: [
        "title^3",
        "description^2",
        "href_text^2",
        "$sc_keywords^2",
        "search_category",
      ],
    },
  },
  highlight: {
    number_of_fragments: 3,
    fragment_size: 150,
    order: "score",
    fields: {
      href_text: {},
      title: {number_of_fragments: 0},
      description: {number_of_fragments: 0},
    },
  },
  _source: {
    includes: unitIncludes,
  },
});
