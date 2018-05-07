// @flow
import {allUnits} from "./elastic";
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
    locations: u._sc_locations || [],
    councilAreas: u._sc_council_areas || [],
  }));
};
