// @flow
import {allUnits, showUnit} from "./elastic";
import type {Unit, Document, Location, Council} from "./types";

export const locationToCouncil = (id: string, location: Location): Council => ({
  id: location._sc_id_hash,
  name: location.council,
  position: [parseFloat(location.lat), parseFloat(location.lng)],
  count: 1,
  keywords: location.keywords,
  unitsByKeywords: location.keywords.reduce(
    (memo, k) => Object.assign(memo, {[k]: [id]}),
    {},
  ),
});

export const unitToDocument = (unit: Unit): Document => ({
  id: unit._sc_id_hash,
  title: unit.title,
  description: unit.description,
  searchCategory: unit.search_category,
  href: unit.href,
  hrefText: unit.href_text ? unit.href_text.trim() : "",
  keywords: unit._sc_keywords,
  highlights: unit._sc_elastic_highlights,
  score: unit._sc_elastic_score,
  councils: unit._sc_council_areas.map(location =>
    locationToCouncil(unit._sc_id_hash, location),
  ),
});

export const list = async (
  ids: Array<string> = [],
): Promise<Array<Document>> => {
  const data = await allUnits(ids);

  return data.map(unitToDocument);
};

export const show = async (id: string): Promise<Document> => {
  const [unit] = await showUnit(id);

  return unitToDocument(unit);
};
