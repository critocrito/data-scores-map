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
    location: [number, number],
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
