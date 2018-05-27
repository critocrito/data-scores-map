// @flow
export type Position = [number, number];

export type UnitIds = Array<string>;

type BaseLocation = {
  _sc_id_hash: string,
  lat: number,
  lng: number,
  keywords: Array<string>,
  unitsByKeywords: {[string]: UnitIds},
};

type CityLocation = BaseLocation & {
  city: string,
  county: string,
};

type CouncilLocation = BaseLocation & {
  council: string,
};

export type Place = {
  id: string,
  type: "city" | "council",
  name: string,
  // FIXME: Only cities have a county, but assigning either council or city to
  //        an entity fails on the county attribute.
  county?: string,
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
  locations: Array<CityLocation>,
  councilAreas: Array<CouncilLocation>,
};

export type Unit = {
  _sc_id_hash: string,
  _sc_keywords: Array<string>,
  _sc_locations: Array<CityLocation>,
  _sc_council_areas: Array<CouncilLocation>,
  title: string,
  description: string,
  search_category: string,
  href: string,
  href_text?: string,
};

type CommonHttpResp = {
  length: number,
};

export type HttpCityResp = {data: Array<Place>} & CommonHttpResp;
export type HttpDocResp = {data: Array<Document>} & CommonHttpResp;
export type HttpCouncilResp = {data: Array<Place>} & CommonHttpResp;
export type HttpResp = HttpCityResp | HttpDocResp | HttpCouncilResp;

export type HttpError = {
  message: string,
};
