// @flow
import {Client as ElasticClient} from "elasticsearch";

import {
  listDocumentsQuery,
  showDocumentQuery,
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

export const documents = (
  elastic: ElasticClient,
  index: string,
  exists: string[],
  from: number,
  size: number,
): Promise<ElasticSearchResp> =>
  elastic.search({
    index,
    from,
    size,
    body: listDocumentsQuery(exists),
  });

export const document = (
  elastic: ElasticClient,
  index: string,
  id: string,
): Promise<ElasticSearchResp> =>
  elastic.search({index, body: showDocumentQuery(id)});

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
