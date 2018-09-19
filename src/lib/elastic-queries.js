// @flow
import type {ElasticAggsQuery, ElasticQuery} from "./types";

const documentFields = [
  "title",
  "description",
  "search_category",
  "search_batch",
  "systems",
  "companies",
  "authorities",
  "departments",
];

const fullDocumentFields = documentFields.concat(["href", "href_text"]);

const parseTerms = (term: string) => {
  const terms = term.split('"');
  const phrases =
    terms.length > 1
      ? terms
          .filter((t) => t !== "")
          .map((t) => t.trim())
          .filter((t) => /\s/g.test(t))
      : [];
  const matches =
    terms.length > 1
      ? terms
          .filter((t) => t !== "")
          .map((t) => t.trim())
          .filter((t) => !/\s/g.test(t))
      : term.split(" ");
  return {phrases, matches};
};

const mentionsQuery = () => ({
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
      {
        nested: {
          path: "authorities",
          query: {
            bool: {
              must: {
                exists: {
                  field: "authorities",
                },
              },
            },
          },
        },
      },
      {
        nested: {
          path: "departments",
          query: {
            bool: {
              must: {
                exists: {
                  field: "departments",
                },
              },
            },
          },
        },
      },
    ],
  },
});

export const companyInsightsQuery = (): ElasticAggsQuery => ({
  size: 0,
  query: mentionsQuery(),
  aggs: {
    companies: {
      terms: {
        size: 100,
        field: "companies.keyword",
      },
    },
  },
});

export const systemInsightsQuery = (): ElasticAggsQuery => ({
  size: 0,
  query: mentionsQuery(),
  aggs: {
    systems: {
      terms: {
        size: 100,
        field: "systems.keyword",
      },
    },
  },
});

export const authorityInsightsQuery = (): ElasticAggsQuery => ({
  _source: ["authorities"],
  size: 1000,
  query: mentionsQuery(),
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

export const departmentInsightsQuery = (): ElasticAggsQuery => ({
  _source: ["departments"],
  size: 1000,
  query: mentionsQuery(),
  aggs: {
    departments: {
      nested: {
        path: "departments",
      },
      aggs: {
        department: {
          terms: {
            size: 1000,
            field: "departments.name.keyword",
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

export const listDocumentsQuery = (
  exists: string[],
  filters: {
    companies: string[],
    systems: string[],
    authorities: string[],
    departments: string[],
  },
): ElasticQuery => {
  const fieldsFilter = exists.map((field) => {
    if (field === "authorities" || field === "departments")
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
  const tagFilters = [
    "companies",
    "systems",
    "authorities",
    "departments",
  ].reduce((memo, key) => {
    if (filters[key] == null || filters[key].length === 0) return memo;
    if (key === "authorities" || key === "departments")
      return memo.concat({
        nested: {
          path: key,
          query: {
            terms: {[`${key}.name.keyword`]: filters[key]},
          },
        },
      });
    return memo.concat({terms: {[`${key}.keyword`]: filters[key]}});
  }, []);

  return {
    _source: {
      includes: documentFields,
    },
    size: 30,
    query: Object.assign({}, mentionsQuery(), {
      bool: {must: tagFilters.concat(fieldsFilter)},
    }),
  };
};

export const searchDocumentsQuery = (
  term: string,
  filters: {[string]: string[]},
): ElasticQuery => {
  const {phrases, matches} = parseTerms(term);

  const phraseQueries = phrases.map((t) => ({
    multi_match: {
      query: t,
      fields: ["title^3", "description^2", "href_text"],
      type: "phrase",
    },
  }));

  const matchQueries =
    matches.length > 0
      ? [
          {
            multi_match: {
              query: matches.join(" "),
              fields: ["title^3", "description^2", "href_text"],
              type: "best_fields",
              tie_breaker: 0.3,
              // fuzziness: "AUTO",
            },
          },
        ]
      : [];

  const queries = Object.keys(filters).map((field) => {
    if (field === "authorities" || field === "departments")
      return {
        nested: {
          path: field,
          query: {
            terms: {[`${field}.name.keyword`]: filters[field]},
          },
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
      includes: documentFields,
    },
    query: {
      bool: {
        must: [
          {
            bool: {
              should: [...phraseQueries, ...matchQueries],
            },
          },
        ].concat(queries),
      },
    },
    highlight: {
      number_of_fragments: 50,
      fragment_size: 250,
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
  _source: {includes: fullDocumentFields},
  query: {
    ids: {
      values: [id],
    },
  },
});
