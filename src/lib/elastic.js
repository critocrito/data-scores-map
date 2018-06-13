// @flow
/* eslint func-names: off */
import {Elastic} from "@sugarcube/plugin-elasticsearch";
import dotenv from "dotenv";

import type {Unit} from "./types";
import {
  listUnitsQuery,
  showUnitQuery,
  listCouncilsQuery,
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

const cleanUnits = (units: Array<Unit>): Array<Unit> =>
  units.map(unit => {
    const title = unit.title ? unit.title.replace(/^PDF/, "").trim() : "";
    return Object.assign(
      {},
      {
        _sc_keywords: [],
        _sc_council_areas: [],
        _sc_elastic_highlights: {},
        _sc_elastic_score: 0,
      },
      unit,
      {title},
    );
  });

const makeQueries = async (gen): Promise<Array<Unit>> => {
  const [data, history] = await Elastic.Do(gen, {
    host: elasticHost,
    port: elasticPort,
  });
  history.forEach(([k, meta]) => log.info(`${k}: ${JSON.stringify(meta)}.`));
  return data;
};

export const allCouncils = (): Promise<Array<Unit>> =>
  makeQueries(function*({
    query,
  }: {
    query: (string, ElasticQuery, number) => Array<Unit>,
  }) {
    // FIXME: Remove hardcoded limit and replace with scrolling.
    yield query(elasticIndex, listCouncilsQuery(), 1000);
  }).then(cleanUnits);

export const allUnits = (ids: Array<string> = []): Promise<Array<Unit>> =>
  makeQueries(function*({
    query,
  }: {
    query: (string, ElasticQuery, number) => Array<Unit>,
  }) {
    yield query(elasticIndex, listUnitsQuery(ids), 1500);
  }).then(cleanUnits);

export const showUnit = (id: string): Promise<Array<Unit>> =>
  makeQueries(function*({
    query,
  }: {
    query: (string, ElasticQuery, number) => Array<Unit>,
  }) {
    yield query(elasticIndex, showUnitQuery(id), 1);
  }).then(cleanUnits);

export const searchUnits = (term: string, size: number): Promise<Array<Unit>> =>
  makeQueries(function*({
    query,
  }: {
    query: (string, ElasticQuery, number) => Array<Unit>,
  }) {
    yield query(elasticIndex, searchUnitsQuery(term), size);
  }).then(cleanUnits);
