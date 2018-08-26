// @flow
import {
  client,
  categoryInsights,
  companyInsights,
  systemInsights,
  authorityInsights,
} from "./elastic";
import {toId} from "./utils";
import type {ElasticCfg} from "./elastic";
import type {
  CategoryInsight,
  CompanySystemInsight,
  AuthorityInsight,
} from "./types";

export const categories = async (
  categoryList: string[],
  {host, port, index}: ElasticCfg,
): Promise<Array<CategoryInsight>> => {
  const elastic = await client(host, port);
  const result = await categoryInsights(elastic, index);

  return categoryList.map((category) => {
    const insight = result.aggregations.keywords.buckets.find(
      ({key}) => key === category,
    ) || {key: category, doc_count: 0};

    return {
      name: insight.key,
      count: insight.doc_count,
      id: toId(insight.key),
    };
  });
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

  return Object.keys(companyMap)
    .reduce((memo, company) => {
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
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const authorities = async ({
  host,
  port,
  index,
}: ElasticCfg): Promise<Array<AuthorityInsight>> => {
  const elastic = await client(host, port);
  // $FlowFixMe
  const {hits, aggregations} = await authorityInsights(elastic, index);

  const transformed = hits.hits.reduce(
    (memo, {_source}) =>
      _source.authorities.reduce(
        (acc, {name, location, systems, companies}) => {
          const elem = acc[name]
            ? acc[name]
            : {
                name,
                location,
                id: toId(name),
                count: 0,
                systems: {},
                companies: {},
              };

          const insight = acc[name]
            ? {doc_count: acc[name].count}
            : aggregations.authorities.name.buckets.find(
                ({key}) => key === name,
              );

          return Object.assign(acc, {
            [name]: Object.assign(elem, {
              count: insight.doc_count,
              companies: (companies || []).reduce(
                (akk, company) =>
                  Object.assign(akk, {[company]: (akk[company] || 0) + 1}),
                elem.companies,
              ),
              systems: (systems || []).reduce(
                (akk, system) =>
                  Object.assign(akk, {[system]: (akk[system] || 0) + 1}),
                elem.systems,
              ),
            }),
          });
        },
        memo,
      ),
    {},
  );
  // FIXME: Using Object.keys() over Object.values() because of
  //        https://github.com/facebook/flow/issues/2221
  return Object.keys(transformed)
    .map((key) => transformed[key])
    .sort((a, b) => a.name.localeCompare(b.name));
};
