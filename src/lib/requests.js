// @flow
import type {HttpDocResp, HttpCouncilResp, HttpSearchResp} from "./types";

const baseUrl: string =
  process.env.REACT_APP_API || "http://localhost:4000/api";

export const fetchDocuments = (ids?: Array<string>): Promise<HttpDocResp> => {
  const body = ids ? {ids} : {};
  return fetch(`${baseUrl}/documents`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then(resp => resp.json());
};

export const fetchDocument = (id: string): Promise<HttpDocResp> =>
  fetch(`${baseUrl}/documents/${id}`).then(resp => resp.json());

export const fetchCouncils = (): Promise<HttpCouncilResp> =>
  fetch(`${baseUrl}/councils`).then(resp => resp.json());

export const search = (
  term: string,
  limit: number = 5,
): Promise<HttpSearchResp> => {
  const url = new URL(`${baseUrl}/search`);
  const params = {q: term, limit: limit.toString()};
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetch(url).then(resp => resp.json());
};
