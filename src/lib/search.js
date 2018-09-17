// @flow
import {client, search as searchDocuments} from "./elastic";
import {searchDocumentsQuery} from "./elastic-queries";
import type {ElasticCfg, HttpDocResp} from "./types";

export const search = async (
  term: string,
  from: number,
  size: number,
  filters: {[string]: string[]},
  {host, port, index}: ElasticCfg,
): Promise<HttpDocResp> => {
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
    const {_id, _source, highlight} = hit;
    const description =
      _source.description != null ? {description: _source.description} : {};
    const highlights = ["href_text", "title", "description"].reduce(
      (memo, key) => {
        if (highlight[key])
          return Object.assign(memo, {
            [key]: Array.from(
              new Set(
                highlight[key].map((row) => row.replace(/\s\s*/g, " ").trim()),
              ),
            ),
          });
        return memo;
      },
      {},
    );

    return {
      id: _id,
      title: _source.title ? _source.title.replace(/^PDF/, "").trim() : "",
      source: _source.search_batch,
      companies: _source.companies || [],
      systems: _source.systems || [],
      authorities: (_source.authorities || []).map(({name}) => name),
      departments: (_source.departments || []).map(({name}) => name),
      ...description,
      highlights,
    };
  });

  return {page: from / size, total, data};
};
