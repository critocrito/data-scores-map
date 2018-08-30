// @flow
import {Client as ElasticClient} from "elasticsearch";

import {
  categoryInsightsQuery,
  companyInsightsQuery,
  systemInsightsQuery,
  authorityInsightsQuery,
  documentCountsQuery,
  companySystemCountsQuery,
  authorityCountsQuery,
} from "./elastic-queries";
import type {
  ElasticQuery,
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

export const categoryInsights = (
  elastic: ElasticClient,
  index: string,
): Promise<ElasticAggsBucketTermsResp> =>
  elastic.search({
    index,
    body: categoryInsightsQuery(),
  });

export const companyInsights = (
  elastic: ElasticClient,
  index: string,
): Promise<ElasticAggsBucketTermsResp> =>
  elastic.search({
    index,
    body: companyInsightsQuery(),
  });

export const systemInsights = (
  elastic: ElasticClient,
  index: string,
): Promise<ElasticAggsBucketTermsResp> =>
  elastic.search({
    index,
    body: systemInsightsQuery(),
  });

export const authorityInsights = (
  elastic: ElasticClient,
  index: string,
): Promise<ElasticAggsBucketNestedTermsResp> =>
  elastic.search({
    index,
    body: authorityInsightsQuery(),
  });

export const documentCounts = (
  elastic: ElasticClient,
  index: string,
): Promise<ElasticSearchResp> =>
  elastic.search({
    index,
    body: documentCountsQuery(),
  });

export const companySystemCounts = (
  elastic: ElasticClient,
  index: string,
): Promise<ElasticSearchResp> =>
  elastic.search({
    index,
    body: companySystemCountsQuery(),
  });

export const authorityCounts = (
  elastic: ElasticClient,
  index: string,
): Promise<ElasticSearchResp> =>
  elastic.search({
    index,
    body: authorityCountsQuery(),
  });

export const search = (
  elastic: ElasticClient,
  index: string,
  body: ElasticQuery,
  opts: {|from: number, size: number|} = {from: 0, size: 30},
): Promise<ElasticSearchResp> =>
  elastic.search({
    index,
    body,
    ...opts,
  });
