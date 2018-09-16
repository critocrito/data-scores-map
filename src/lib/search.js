// @flow
import {client, search as searchDocuments} from "./elastic";
import {searchDocumentsQuery} from "./elastic-queries";
import type {ElasticCfg, HttpFullDocResp} from "./types";

export const search = async (
  term: string,
  from: number,
  size: number,
  filters: {[string]: string[]},
  {host, port, index}: ElasticCfg,
): Promise<HttpFullDocResp> => {
  const elastic = await client(host, port);
  const query = searchDocumentsQuery(
    term,
    Object.keys(filters || {}).reduce((memo, key) => {
      if (filters[key].length === 0) return memo;
      return Object.assign({}, memo, {[key]: filters[key]});
    }, {}),
  );
  const result = await searchDocuments(elastic, index, query, {from, size});

  const {total, hits} = result.hits;
  const data = hits.map((hit) => {
    const {_id, _source} = hit;
    const description =
      _source.description != null ? {description: _source.description} : {};
    const href = _source.href != null ? {href: _source.href} : {};
    const hrefText =
      _source.href_text != null ? {href_text: _source.href_text.trim()} : {};
    return {
      id: _id,
      title: _source.title ? _source.title.replace(/^PDF/, "").trim() : "",
      source: _source.search_batch,
      companies: _source.companies || [],
      systems: _source.systems || [],
      authorities: (_source.authorities || []).map(({name}) => name),
      departments: (_source.departments || []).map(({name}) => name),
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
