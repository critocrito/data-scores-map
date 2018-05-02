import {Elastic} from "@sugarcube/plugin-elasticsearch";
import dotenv from "dotenv";

import {listCitiesQuery, showCityQuery} from "./elastic-queries";
import log from "./logging";

dotenv.config();

const {
  DS_ELASTIC_HOST: elasticHost,
  DS_ELASTIC_PORT: elasticPort,
  DS_ELASTIC_INDEX: elasticIndex,
} = process.env;

const makeQueries = async gen => {
  const [data, history] = await Elastic.Do(gen, elasticHost, elasticPort);
  history.forEach(([k, meta]) => log.info(`${k}: ${JSON.stringify(meta)}.`));
  return data;
};

export const allCities = () =>
  // eslint-disable-next-line func-names
  makeQueries(function*({query}) {
    // FIXME: Remove hardcoded limit and replace with scrolling.
    yield query(elasticIndex, listCitiesQuery(), 100);
  });

export const oneCity = (city, county) =>
  // eslint-disable-next-line func-names
  makeQueries(function*({query}) {
    // FIXME: Remove hardcoded limit and replace with scrolling.
    yield query(elasticIndex, showCityQuery(city, county), 1000);
  });
