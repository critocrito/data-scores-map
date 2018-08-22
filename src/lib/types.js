// @flow
export type Position = [number, number];

export type UnitIds = Array<string>;

export type Insight = {
  id: string,
  name: string,
  count: number,
};

export type CategoryInsight = Insight;

export type CompanySystemInsight = Insight & {
  systems: Array<Insight>,
};

export type AuthorityInsight = Insight & {
  companies: Array<{[string]: number}>,
  systems: Array<{[string]: number}>,
  location: Position,
};

export type Stat = {
  name: string,
  count: number,
};

export type Location = {
  _sc_id_hash: string,
  council: string,
  lat: number,
  lng: number,
  keywords: Array<string>,
};

export type Unit = {
  _sc_id_hash: string,
  _sc_keywords: Array<string>,
  _sc_council_areas: Array<Location>,
  _sc_elastic_highlights: {[string]: Array<string>},
  _sc_elastic_score: number,
  title: string,
  description: string,
  search_category: string,
  href: string,
  href_text?: string,
};

export type Council = {
  id: string,
  name: string,
  position: Position,
  count: number,
  keywords: Array<string>,
  unitsByKeywords: {[keyword: string]: UnitIds},
};

export type Document = {
  id: string,
  title: string,
  description: string,
  href: string,
  hrefText?: string,
  searchCategory: string,
  keywords: Array<string>,
  councils: Array<Council>,
  highlights: {[string]: Array<string>},
  score?: number,
};

type CommonHttpResp = {
  length: number,
};

export type HttpDocResp = {data: Array<Document>} & CommonHttpResp;
export type HttpCouncilResp = {data: Array<Council>} & CommonHttpResp;
export type HttpSearchResp = {data: Array<Document>} & CommonHttpResp;
export type HttpResp = HttpDocResp | HttpCouncilResp | HttpSearchResp;

export type HttpError = {
  message: string,
};
