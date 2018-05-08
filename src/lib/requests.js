// @flow
import type {HttpDocResp, HttpCityResp, HttpCouncilResp} from "./types";

const baseUrl: string = "http://localhost:4000/api";

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
