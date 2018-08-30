// @flow
import {client, search} from "./elastic";
import {
  documentCountsQuery,
  companySystemCountsQuery,
  authorityCountsQuery,
} from "./elastic-queries";
import type {ElasticCfg, Stat} from "./types";

export const documents = async ({
  host,
  port,
  index,
}: ElasticCfg): Promise<Array<Stat>> => {
  const elastic = await client(host, port);

  const resultDocuments = await search(elastic, index, documentCountsQuery());
  const resultCompaniesSystems = await search(
    elastic,
    index,
    companySystemCountsQuery(),
  );
  const resultAuthorities = await search(
    elastic,
    index,
    authorityCountsQuery(),
  );

  return [
    {name: "documents", count: resultDocuments.hits.total},
    {name: "companies-systems", count: resultCompaniesSystems.hits.total},
    {name: "authorities", count: resultAuthorities.hits.total},
  ];
};
