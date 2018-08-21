// @flow
import {client, keywordInsights} from "./elastic";
import {toId} from "./utils";
import type {KeywordInsight} from "./types";

type ElasticCfg = {
  host: string,
  port: number,
  index: string,
};

export const keywords = async ({
  host,
  port,
  index,
}: ElasticCfg): Promise<Array<KeywordInsight>> => {
  const elastic = await client(host, port);
  const result = await keywordInsights(elastic, index);

  return result.aggregations.keywords.buckets.map((bucket) => ({
    name: bucket.key,
    count: bucket.doc_count,
    id: toId(bucket.key),
  }));
};
