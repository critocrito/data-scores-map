// @flow
import {
  client,
  keywordInsights,
  companyInsights,
  systemInsights,
} from "./elastic";
import {toId} from "./utils";
import type {KeywordInsight, CompanySystemInsight} from "./types";

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

export const companiesAndSystems = async (
  companyMap: {[string]: string[]},
  systemMap: {[string]: string},
  {host, port, index}: ElasticCfg,
): Promise<Array<CompanySystemInsight>> => {
  const elastic = await client(host, port);
  const [companiesResult, systemsResult] = await Promise.all([
    companyInsights(elastic, index),
    systemInsights(elastic, index),
  ]);

  return Object.keys(companyMap).reduce((memo, company) => {
    const companyInsight = companiesResult.aggregations.companies.buckets.find(
      ({key}) => key === company,
    ) || {key: company, doc_count: 0};

    const systems = companyMap[companyInsight.key].reduce((acc, system) => {
      const systemInsight = systemsResult.aggregations.systems.buckets.find(
        ({key}) => key === system,
      ) || {key: system, doc_count: 0};

      return acc.concat({
        name: systemInsight.key,
        count: systemInsight.doc_count,
        id: toId(systemInsight.key),
      });
    }, []);

    return memo.concat({
      name: companyInsight.key,
      count: companyInsight.doc_count,
      id: toId(companyInsight.key),
      systems,
    });
  }, []);
};
