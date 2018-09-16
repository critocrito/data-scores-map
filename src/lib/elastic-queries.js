// @flow
import type {ElasticAggsQuery, ElasticQuery} from "./types";

const documentFields = [
  "title",
  "search_category",
  "search_batch",
  "systems",
  "companies",
  "authorities",
  "departments",
];

const fullDocumentFields = documentFields.concat([
  "description",
  "href",
  "href_text",
]);

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
  authorities: string[],
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
  const authoritiesFilter =
    authorities.length > 0
      ? [
          {
            nested: {
              path: "authorities",
              query: {
                terms: {"authorities.name.keyword": authorities},
              },
            },
          },
        ]
      : [];
  const filter = authoritiesFilter.concat({bool: {should: fieldsFilter}});

  return {
    _source: {
      includes: documentFields,
    },
    size: 30,
    query: Object.assign({}, mentionsQuery(), {bool: {filter}}),
  };
};

export const searchDocumentsQuery = (
  term: string,
  filters: {[string]: string[]},
): ElasticQuery => {
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
  _source: {includes: fullDocumentFields},
  query: {
    ids: {
      values: [id],
    },
  },
});
