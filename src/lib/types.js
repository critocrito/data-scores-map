// @flow
export type Position = [number, number];

export type UnitIds = Array<string>;

type Location = {
  city: string,
  county: string,
  lat: number,
  lng: number,
  keywords: Array<string>,
  unitsByKeywords: {[string]: UnitIds},
};

type UnitLocation = Location & {
  _sc_id_hash: string,
};

export type City = {
  id: string,
  name: string,
  county: string,
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
  href_text?: string,
  search_category: string,
};

export type Unit = Document & {
  _sc_id_hash: string,
  _sc_locations: Array<UnitLocation>,
  _sc_keywords: Array<string>,
};

type CommonHttpResp = {
  length: number,
};

export type HttpCityResp = {data: Array<City>} & CommonHttpResp;
export type HttpDocResp = {data: Array<Document>} & CommonHttpResp;
export type HttpResp = HttpCityResp | HttpDocResp;

export type HttpError = {
  message: string,
};
