// @flow
import {client, aggregateTerms, aggregateNestedTerms} from "./elastic";
import {
  companyInsightsQuery,
  systemInsightsQuery,
  authorityInsightsQuery,
  departmentInsightsQuery,
  sourceInsightsQuery,
} from "./elastic-queries";
import {sourcify, toId} from "./utils";
import type {
  ElasticCfg,
  SourceInsight,
  CompanySystemInsight,
  AuthorityInsight,
  DepartmentInsight,
} from "./types";

export const companiesAndSystems = async (
  companyMap: {[string]: string[]},
  systemMap: {[string]: string},
  {host, port, index}: ElasticCfg,
): Promise<Array<CompanySystemInsight>> => {
  const elastic = await client(host, port);
  const [companiesResult, systemsResult] = await Promise.all([
    aggregateTerms(elastic, index, companyInsightsQuery()),
    aggregateTerms(elastic, index, systemInsightsQuery()),
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
}: ElasticCfg): Promise<AuthorityInsight[]> => {
  const elastic = await client(host, port);
  // $FlowFixMe
  const {hits, aggregations} = await aggregateNestedTerms(
    elastic,
    index,
    authorityInsightsQuery(),
  );

  const transformed = hits.hits.reduce((memo, {_source}) => {
    if (_source.authorities)
      return _source.authorities.reduce(
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
            : aggregations.authorities.authority.buckets.find(
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
      );
    return memo;
  }, {});
  // FIXME: Using Object.keys() over Object.values() because of
  //        https://github.com/facebook/flow/issues/2221
  return Object.keys(transformed)
    .map((key) => transformed[key])
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const departments = async (
  departmentMap: {[string]: string},
  {host, port, index}: ElasticCfg,
): Promise<DepartmentInsight[]> => {
  const elastic = await client(host, port);
  // $FlowFixMe
  const {hits, aggregations} = await aggregateNestedTerms(
    elastic,
    index,
    departmentInsightsQuery(),
  );

  const transformed = hits.hits.reduce((memo, {_source}) => {
    if (_source.departments)
      return _source.departments.reduce((acc, {name, systems, companies}) => {
        const tag = departmentMap[name];
        const elem = acc[name]
          ? acc[name]
          : {
              name,
              tag: tag || null,
              id: toId(name),
              count: 0,
              systems: {},
              companies: {},
            };

        const insight = acc[name]
          ? {doc_count: acc[name].count}
          : aggregations.departments.department.buckets.find(
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
      }, memo);
    return memo;
  }, {});
  // FIXME: Using Object.keys() over Object.values() because of
  //        https://github.com/facebook/flow/issues/2221
  return Object.keys(transformed)
    .map((key) => transformed[key])
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const sources = async ({
  host,
  port,
  index,
}: ElasticCfg): Promise<SourceInsight[]> => {
  const elastic = await client(host, port);
  // $FlowFixMe
  const {aggregations} = await aggregateNestedTerms(
    elastic,
    index,
    sourceInsightsQuery(),
  );

  return aggregations.sources.buckets
    .map(({key, doc_count: count}) => ({
      name: key,
      prettyName: sourcify(key),
      id: toId(sourcify(key)),
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};
