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
  departments?: Array<{
    name: string,
    location: Position,
    companies: string[],
    systems: string[],
  }>,
};

export type Highlights = {|
  href_text?: string[],
  title?: string[],
  description?: string[],
|};

export type Item = {
  id: string,
  name: string,
  prettyName?: string,
};

export type Insight = Item & {
  count: number,
};

export type CompanySystemInsight = Insight & {
  systems: Array<Insight>,
};

export type AuthorityInsight = Insight & {
  companies: {[string]: number},
  systems: {[string]: number},
  location: Position,
};

export type DepartmentInsight = Insight & {
  companies: {[string]: number},
  systems: {[string]: number},
  tag: null | string,
};

export type SourceInsight = Insight;

export type Impact = Item & {
  count: number,
};

export type PredictiveAnalyticsImpact = Impact & {
  link: string,
  location: Position,
  systems: Array<{name: string, notes: string, extract: string}>,
};

export type Stat = {
  name: string,
  count: number,
};

export type Document = {
  id: string,
  title: string,
  description: string,
  source: string,
  companies: string[],
  systems: string[],
  authorities: string[],
  departments: string[],
  highlights?: Highlights,
};

export type FullDocument = Document & {
  href: string,
  href_text: string,
};

export type HttpInsightResp = {
  length: number,
};

export type HttpDocumentResp = {
  total: number,
  page: number,
};

export type HttpDocResp = {data: Document[]} & HttpDocumentResp;
export type HttpFullDocResp = {data: FullDocument[]} & HttpDocumentResp;
export type HttpCompSysInsightResp = {
  data: CompanySystemInsight[],
} & HttpInsightResp;
export type HttpAuthorityInsightResp = {
  data: AuthorityInsight[],
} & HttpInsightResp;
export type HttpPredictiveAnalyticsImpactResp = {
  data: PredictiveAnalyticsImpact[],
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
  hits: {
    total: number,
    max_score: number,
    hits: Array<{
      _id: string,
      _score: number,
      _source: DocumentSource,
      highlight: Highlights,
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
    ["companies" | "systems"]: ElasticAggregation,
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

export type ElasticQuery = {
  query: {},
  _source?: {},
};

export type ElasticAggsQuery = {
  aggs: {},
  size?: number,
};
