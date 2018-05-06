// @flow
import {Elastic} from "@sugarcube/plugin-elasticsearch";
import dotenv from "dotenv";

import type {Unit} from "./types";
import {listCitiesQuery, showCityQuery} from "./elastic-queries";
import type {ElasticQuery} from "./elastic-queries";
import log from "./logging";

dotenv.config();

type ElasticApi = {
  query: (string, ElasticQuery, number) => Array<Unit>,
};

const {
  DS_ELASTIC_HOST: elasticHost,
  DS_ELASTIC_PORT: elasticPort,
  DS_ELASTIC_INDEX: elasticIndex,
} = Object.assign(
  {
    DS_ELASTIC_HOST: "localhost",
    DS_ELASTIC_PORT: 9200,
    DS_ELASTIC_INDEX: "data-scores",
  },
  process.env,
);

const makeQueries = async (gen): Promise<Array<Unit>> => {
  const [data, history] = await Elastic.Do(gen, elasticHost, elasticPort);
  history.forEach(([k, meta]) => log.info(`${k}: ${JSON.stringify(meta)}.`));
  return data;
};

export const allCities = (): Promise<Array<Unit>> =>
  // eslint-disable-next-line func-names
  makeQueries(function*({query}: ElasticApi) {
    // FIXME: Remove hardcoded limit and replace with scrolling.
    yield query(elasticIndex, listCitiesQuery(), 100);
  });

export const oneCity = (city: string, county: string): Promise<Array<Unit>> =>
  // eslint-disable-next-line func-names
  makeQueries(function*({query}: ElasticApi) {
    // FIXME: Remove hardcoded limit and replace with scrolling.
    yield query(elasticIndex, showCityQuery(city, county), 1000);
  });
