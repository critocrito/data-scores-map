// @flow
/* eslint func-names: off */
import {Elastic} from "@sugarcube/plugin-elasticsearch";
import dotenv from "dotenv";

import type {Unit} from "./types";
import {
  listUnitsQuery,
  listCitiesQuery,
  listCouncilsQuery,
  showCityQuery,
  searchUnitsQuery,
} from "./elastic-queries";
import type {ElasticQuery} from "./elastic-queries";
import log from "./logging";

dotenv.config();

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
  makeQueries(function*({
    query,
  }: {
    query: (string, ElasticQuery, number) => Array<Unit>,
  }) {
    // FIXME: Remove hardcoded limit and replace with scrolling.
    yield query(elasticIndex, listCitiesQuery(), 100);
  });

export const oneCity = (city: string, county: string): Promise<Array<Unit>> =>
  makeQueries(function*({
    query,
  }: {
    query: (string, ElasticQuery, number) => Array<Unit>,
  }) {
    // FIXME: Remove hardcoded limit and replace with scrolling.
    yield query(elasticIndex, showCityQuery(city, county), 1000);
  });

export const allCouncils = (): Promise<Array<Unit>> =>
  makeQueries(function*({
    query,
  }: {
    query: (string, ElasticQuery, number) => Array<Unit>,
  }) {
    // FIXME: Remove hardcoded limit and replace with scrolling.
    yield query(elasticIndex, listCouncilsQuery(), 100);
  }).then(data =>
    data.map(unit =>
      Object.assign({}, {_sc_locations: [], _sc_council_areas: []}, unit),
    ),
  );

export const allUnits = (ids: Array<string> = []): Promise<Array<Unit>> =>
  makeQueries(function*({
    query,
  }: {
    query: (string, ElasticQuery, number) => Array<Unit>,
  }) {
    yield query(elasticIndex, listUnitsQuery(ids), 1500);
  });

export const searchUnits = (term: string, size: number): Promise<Array<Unit>> =>
  makeQueries(function*({
    query,
  }: {
    query: (string, ElasticQuery, number) => Array<Unit>,
  }) {
    yield query(elasticIndex, searchUnitsQuery(term), size);
  });
