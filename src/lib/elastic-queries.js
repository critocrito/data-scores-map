// @flow
export type ElasticQuery = {
  query: {},
  _source?: {},
};

export type ElasticAggregation = {
  aggs: {},
  size?: number,
};

export const categoryInsightsQuery = (): ElasticAggregation => ({
  size: 0,
  aggs: {
    categories: {
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
        authority: {
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

export const companySystemCountsQuery = (): ElasticQuery => ({
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

export const listDocumentsQuery = (exists: string[]): ElasticQuery => {
  const queries = exists.map((field) => {
    if (field === "authorities")
      return {
        nested: {
          path: field,
          query: {
            bool: {
              must: {
                exists: {
                  field,
                },
              },
            },
          },
        },
      };
    return {
      exists: {
        field,
      },
    };
  });
  return {
    _source: {
      includes: [
        "title",
        "search_batch",
        "systems",
        "companies",
        "authorities",
      ],
    },
    size: 30,
    query: {
      bool: {
        should: queries,
      },
    },
  };
};

export const searchDocumentsQuery = (
  term: string,
  filters: {[string]: string[]},
): ElasticQuery => {
  const queries = Object.keys(filters).map((field) => {
    if (field === "authorities")
      return {
        nested: {
          path: field,
          query: {
            terms: {"authorities.name.keyword": filters[field]},
          },
        },
      };
    if (field === "categories")
      return {
        terms: {
          search_category: filters[field],
        },
      };
    return {
      terms: {
        [field]: filters[field],
      },
    };
  });
  return {
    _source: {
      includes: [
        "title",
        "search_batch",
        "systems",
        "companies",
        "authorities",
      ],
    },
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: term,
              fields: ["title^3", "description^2", "href_text^2"],
            },
          },
          ...queries,
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
  };
};

export const showDocumentQuery = (id: string): ElasticQuery => ({
  query: {
    ids: {
      values: [id],
    },
  },
});
