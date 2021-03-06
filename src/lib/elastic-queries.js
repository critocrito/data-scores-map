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

const mentionsQuery = () => ({
  bool: {
    must_not: {
      term: {blacklisted: true},
    },
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

export const sourceInsightsQuery = (): ElasticAggsQuery => ({
  size: 0,
  query: mentionsQuery(),
  aggs: {
    sources: {
      terms: {
        size: 100,
        field: "search_batch.keyword",
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
    sources: string[],
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
    "sources",
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
    if (key === "sources")
      return memo.concat({terms: {"search_batch.keyword": filters[key]}});
    return memo.concat({terms: {[`${key}.keyword`]: filters[key]}});
  }, []);

  return {
    _source: {
      includes: documentFields,
    },
    size: 30,
    query: Object.assign({}, mentionsQuery(), {
      bool: {
        must_not: {
          term: {blacklisted: true},
        },
        must: (fieldsFilter.length > 0
          ? [{bool: {should: [fieldsFilter]}}]
          : []
        ).concat(tagFilters),
      },
    }),
  };
};

export const searchDocumentsQuery = (
  term: string,
  filters: {[string]: string[]},
): ElasticQuery => {
  const matchQuery =
    term.length > 0
      ? {
          simple_query_string: {
            query: term,
            fields: ["title^3", "description^2", "href_text"],
            default_operator: "AND",
          },
        }
      : {match_all: {}};
  const filterQueries = Object.keys(filters).reduce((memo, field) => {
    if (field === "authorities" || field === "departments")
      return memo.concat(
        filters[field].map((f) => ({
          nested: {
            path: field,
            query: {
              match_phrase: {[`${field}.name.keyword`]: f},
            },
          },
        })),
      );
    if (field === "sources")
      return memo.concat(
        filters[field].map((f) => ({
          match_phrase: {
            search_batch: f,
          },
        })),
      );
    return memo.concat(
      filters[field].map((f) => ({
        match_phrase: {
          [field]: f,
        },
      })),
    );
  }, []);

  return {
    _source: {
      includes: documentFields,
    },
    query: {
      bool: {
        must_not: {
          term: {blacklisted: true},
        },
        must: [matchQuery].concat({bool: {should: filterQueries}}),
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
