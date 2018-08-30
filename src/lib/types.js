// @flow
export type Position = [number, number];

export type DocumentSource = {
  title: string,
  search_batch: string,
  search_category: string | string[],
  description?: string,
  href?: string,
  href_text?: string,
  companies?: string[],
  systems?: string[],
  authorities?: Array<{
    name: string,
    location: Position,
    companies: string[],
    systems: string[],
  }>,
};

export type Item = {
  id: string,
  name: string,
};

export type Insight = Item & {
  count: number,
};

export type CategoryInsight = Insight;

export type CompanySystemInsight = Insight & {
  systems: Array<Insight>,
};

export type AuthorityInsight = Insight & {
  companies: {[string]: number},
  systems: {[string]: number},
  location: Position,
};

export type Stat = {
  name: string,
  count: number,
};

export type Document = {
  id: string,
  title: string,
  source: string,
  categories: string[],
  companies: string[],
  systems: string[],
  authorities: string[],
  // highlights: {[string]: Array<string>},
  // score?: number,
};

export type FullDocument = Document & {
  description: string,
  href: string,
  href_text: string,
};

type HttpInsightResp = {
  length: number,
};

type HttpDocumentResp = {
  total: number,
};

export type HttpDocResp = {data: Document[]} & HttpDocumentResp;
export type HttpFullDocResp = {data: FullDocument[]} & HttpDocumentResp;
export type HttpCategoryInsightResp = {
  data: CategoryInsight[],
} & HttpInsightResp;
export type HttpCompSysInsightResp = {
  data: CompanySystemInsight[],
} & HttpInsightResp;
export type HttpAuthorityInsightResp = {
  data: AuthorityInsight[],
} & HttpInsightResp;
export type HttpStatResp = {
  data: Stat[],
} & HttpInsightResp;

export type HttpError = {
  message: string,
};

export type ElasticCfg = {
  host: string,
  port: number,
  index: string,
};

export type ElasticSearchResp = {
  took: number,
  timed_out: boolean,
  _shards: {
    total: number,
    successful: number,
    skipped: number,
    failed: number,
  },
  hits: {
    total: number,
    max_score: number,
    hits: Array<{
      _id: string,
      _score: number,
      _source: DocumentSource,
    }>,
  },
};

export type ElasticAggregation = {
  doc_count_error_upper_bound: number,
  sum_other_doc_count: number,
  buckets: Array<{key: string, doc_count: number}>,
};

export type ElasticAggsBucketTermsResp = ElasticSearchResp & {
  aggregations: {
    [
      | "categories"
      | "companies"
      | "systems"
      | "authorities"]: ElasticAggregation,
  },
};

export type ElasticAggsBucketNestedTermsResp = ElasticSearchResp & {
  aggregations: {
    authorities: {
      doc_count: number,
      authority: ElasticAggregation,
    },
  },
};

export type ElasticAggregationResp =
  | ElasticAggsBucketTermsResp
  | ElasticAggsBucketNestedTermsResp;

export type ElasticQuery = {
  query: {},
  _source?: {},
};

export type ElasticAggsQuery = {
  aggs: {},
  size?: number,
};
