// @flow
import {
  client,
  documentCounts,
  companySystemCounts,
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
  const resultCompaniesSystems = await companySystemCounts(elastic, index);
  const resultAuthorities = await authorityCounts(elastic, index);

  return [
    {name: "documents", count: resultDocuments.hits.total},
    {name: "companies-systems", count: resultCompaniesSystems.hits.total},
    {name: "authorities", count: resultAuthorities.hits.total},
  ];
};
