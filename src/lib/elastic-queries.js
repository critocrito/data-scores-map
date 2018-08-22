// @flow
export type ElasticQuery = {
  query: {},
  _source?: {},
};

export type ElasticAggregation = {
  aggs: {},
  size?: number,
};

const unitIncludes = [
  "$sc_id_hash",
  "title",
  "description",
  "href",
  "search_category",
  "$sc_keywords",
  "$sc_council_areas",
];

export const listUnitsQuery = (ids: Array<string>): ElasticQuery => {
  const qs = ids.length === 0 ? {match_all: {}} : {ids: {values: ids}};
  return {
    query: {
      nested: {
        path: "$sc_council_areas",
        query: {
          bool: {
            must: [{exists: {field: "$sc_council_areas"}}, qs],
          },
        },
      },
    },
    _source: {
      includes: unitIncludes,
    },
  };
};

export const showUnitQuery = (id: string): ElasticQuery => ({
  query: {
    match: {
      $sc_id_hash: id,
    },
  },
  _source: {
    includes: unitIncludes.concat("href_text"),
  },
});

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

export const categoryInsightsQuery = (): ElasticAggregation => ({
  size: 0,
  aggs: {
    keywords: {
      terms: {
        size: 100,
        field: "search_category.keyword",
      },
    },
  },
});

export const companyInsightsQuery = (): ElasticAggregation => ({
  size: 0,
  aggs: {
    companies: {
      terms: {
        size: 100,
        field: "companies.keyword",
      },
    },
  },
});

export const systemInsightsQuery = (): ElasticAggregation => ({
  size: 0,
  aggs: {
    systems: {
      terms: {
        size: 100,
        field: "systems.keyword",
      },
    },
  },
});

export const authorityInsightsQuery = (): ElasticAggregation => ({
  _source: ["authorities"],
  size: 1000,
  query: {
    bool: {
      must: {
        nested: {
          path: "authorities",
          query: {
            bool: {
              must: [
                {
                  exists: {
                    field: "authorities",
                  },
                },
              ],
            },
          },
        },
      },
    },
  },
  aggs: {
    authorities: {
      nested: {
        path: "authorities",
      },
      aggs: {
        name: {
          terms: {
            size: 1000,
            field: "authorities.name.keyword",
          },
        },
      },
    },
  },
});

export const documentCountsQuery = (): ElasticQuery => ({
  size: 0,
  query: {
    match_all: {},
  },
});

export const companyCountsQuery = (): ElasticQuery => ({
  size: 0,
  query: {
    bool: {
      should: [
        {
          exists: {
            field: "companies",
          },
        },
        {
          exists: {
            field: "systems",
          },
        },
      ],
    },
  },
});

export const authorityCountsQuery = (): ElasticQuery => ({
  size: 0,
  query: {
    nested: {
      path: "authorities",
      query: {
        bool: {
          must: [
            {
              exists: {
                field: "authorities",
              },
            },
          ],
        },
      },
    },
  },
});
