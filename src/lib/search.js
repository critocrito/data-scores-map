// @flow
import {searchUnits} from "./elastic";
import type {Document} from "./types";

export const search = async (
  term: string,
  limit: number = 10,
): Promise<Array<Document>> => {
  const data = await searchUnits(term, limit);
  return data.map(unit => {
    const highlights = unit._sc_elastic_highlights;

    return {
      id: unit._sc_id_hash,
      title: unit.title,
      description: unit.description,
      searchCategory: unit.search_category,
      href: unit.href,
      hrefText: unit.href_text,
      score: unit._sc_elastic_score,
      keywords: unit._sc_keywords || [],
      councilAreas: unit._sc_council_areas || [],
      // Tighten the highlighted snippet and remove excessive whitespace.
      highlights: Object.keys(highlights).reduce(
        (memo, key) =>
          Object.assign(memo, {
            [key]: highlights[key].map(s => s.replace(/\s\s*/g, " ").trim()),
          }),
        {},
      ),
    };
  });
};
