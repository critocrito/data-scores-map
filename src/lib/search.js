// @flow
import {client, searchDocuments} from "./elastic";
import type {HttpFullDocResp} from "./types";
import type {ElasticCfg} from "./elastic";

export const search = async (
  term: string,
  from: number,
  size: number,
  filters: {[string]: string[]},
  {host, port, index}: ElasticCfg,
): Promise<HttpFullDocResp> => {
  const elastic = await client(host, port);
  const result = await searchDocuments(
    elastic,
    index,
    term,
    from,
    size,
    filters,
  );

  const {total, hits} = result.hits;
  const data = hits.map((hit) => {
    const {_id, _source} = hit;
    const description =
      _source.description != null ? {description: _source.description} : {};
    const href = _source.href != null ? {href: _source.href} : {};
    const hrefText =
      _source.href_text != null ? {href_text: _source.href_text} : {};
    return {
      id: _id,
      title: _source.title ? _source.title.replace(/^PDF/, "").trim() : "",
      source: _source.search_batch,
      categories: Array.isArray(_source.search_category)
        ? _source.search_category
        : [_source.search_category],
      companies: _source.companies || [],
      systems: _source.systems || [],
      authorities: (_source.authorities || []).map(({name}) => name),
      ...description,
      ...href,
      ...hrefText,
    };
  });

  return {total, data};
  // .map((unit) => {
  // // Tighten the highlighted snippet and remove excessive whitespace.
  // const highlights = Object.keys(unit._sc_elastic_highlights).reduce(
  //   (memo, key) =>
  //     Object.assign(memo, {
  //       [key]: unit._sc_elastic_highlights[key].map((s) =>
  //         s.replace(/\s\s*/g, " ").trim(),
  //       ),
  //     }),
  //   {},
  // );
  // return Object.assign({}, unitToDocument(unit), {highlights});
  // });
};
