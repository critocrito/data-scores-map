// @flow
import dotenv from "dotenv";
import type {HttpDocResp, HttpCityResp, HttpCouncilResp} from "./types";

dotenv.config();

const {DS_BASE_URL: baseUrl} = Object.assign(
  {
    DS_BASE_URL: "http://localhost:4000",
  },
  process.env,
);

export const fetchCities = (): Promise<HttpCityResp> =>
  fetch(`${baseUrl}/cities`).then(resp => resp.json());

export const fetchDocuments = (ids?: Array<string>): Promise<HttpDocResp> => {
  const body = ids ? {ids} : {};
  return fetch(`${baseUrl}/units`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then(resp => resp.json());
};

export const fetchCouncils = (): Promise<HttpCouncilResp> =>
  fetch(`${baseUrl}/councils`).then(resp => resp.json());
