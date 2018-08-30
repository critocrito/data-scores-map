// @flow
import {Client as ElasticClient} from "elasticsearch";

import type {
  ElasticQuery,
  ElasticAggsQuery,
  ElasticSearchResp,
  ElasticAggsBucketTermsResp,
  ElasticAggsBucketNestedTermsResp,
} from "./types";

export const client = (() => {
  let cache;
  const fn = async (host: string, port: number): ElasticClient => {
    if (cache != null) return cache;
    cache = new ElasticClient({host: `${host}:${port}`, log: "debug"});
    return cache;
  };
  return fn;
})();

export const search = (
  elastic: ElasticClient,
  index: string,
  body: ElasticQuery,
  opts: {|from: number, size: number|} = {from: 0, size: 30},
): Promise<ElasticSearchResp> => elastic.search({index, body, ...opts});

export const aggregateTerms = (
  elastic: ElasticClient,
  index: string,
  body: ElasticAggsQuery,
): Promise<ElasticAggsBucketTermsResp> => elastic.search({index, body});

export const aggregateNestedTerms = (
  elastic: ElasticClient,
  index: string,
  body: ElasticAggsQuery,
): Promise<ElasticAggsBucketNestedTermsResp> => elastic.search({index, body});
