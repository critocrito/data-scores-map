// @flow
import {
  client,
  documentCounts,
  companyCounts,
  authorityCounts,
} from "./elastic";
import type {Stat} from "./types";
import type {ElasticCfg} from "./elastic";

export const documents = async ({
  host,
  port,
  index,
}: ElasticCfg): Promise<Array<Stat>> => {
  const elastic = await client(host, port);

  const resultDocuments = await documentCounts(elastic, index);
  const resultCompanies = await companyCounts(elastic, index);
  const resultAuthorities = await authorityCounts(elastic, index);

  return [
    {name: "documents", count: resultDocuments.hits.total},
    {name: "companies", count: resultCompanies.hits.total},
    {name: "authorities", count: resultAuthorities.hits.total},
  ];
};
