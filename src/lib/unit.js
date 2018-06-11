// @flow
import {allUnits, showDocument} from "./elastic";
import type {Document} from "./types";

export const list = async (
  ids: Array<string> = [],
): Promise<Array<Document>> => {
  const data = await allUnits(ids);

  return data.map(u => ({
    id: u._sc_id_hash,
    title: u.title,
    description: u.description,
    searchCategory: u.search_category,
    href: u.href,
    hrefText: u.href_text,
    keywords: u._sc_keywords || [],
    councilAreas: u._sc_council_areas || [],
  }));
};

export const show = async (id: string): Promise<Document> => {
  const [unit] = await showDocument(id);

  return {
    id: unit._sc_id_hash,
    title: unit.title,
    description: unit.description,
    searchCategory: unit.search_category,
    href: unit.href,
    hrefText: unit.href_text,
    keywords: unit._sc_keywords || [],
    councilAreas: unit._sc_council_areas || [],
  };
};
