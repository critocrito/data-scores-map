// @flow
import {client, search} from "./elastic";
import {listDocumentsQuery, showDocumentQuery} from "./elastic-queries";
import type {ElasticCfg, HttpDocResp} from "./types";

export const list = async (
  exists: string[],
  from: number,
  size: number,
  {host, port, index}: ElasticCfg,
): Promise<HttpDocResp> => {
  const elastic = await client(host, port);
  const query = listDocumentsQuery(exists);
  const result = await search(elastic, index, query, {from, size});

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
};

export const show = async (
  id: string,
  {host, port, index}: ElasticCfg,
): Promise<HttpDocResp> => {
  const elastic = await client(host, port);
  const query = showDocumentQuery(id);
  const result = await search(elastic, index, query);

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
};
