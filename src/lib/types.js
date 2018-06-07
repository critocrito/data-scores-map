// @flow
export type Position = [number, number];

export type UnitIds = Array<string>;

type Location = {
  _sc_id_hash: string,
  council: string,
  lat: number,
  lng: number,
  keywords: Array<string>,
  unitsByKeywords: {[string]: UnitIds},
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
  councilAreas: Array<Location>,
  highlights?: {[string]: Array<string>},
  score?: number,
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
