// @flow
import type {
  HttpInsightResp,
  HttpCompSysInsightResp,
  HttpAuthorityInsightResp,
  HttpStatResp,
  HttpDocResp,
  HttpFullDocResp,
  HttpPredictiveAnalyticsImpactResp,
} from "./types";

const baseUrl: string =
  process.env.REACT_APP_API != null
    ? process.env.REACT_APP_API
    : "http://localhost:4000";

export const search = (
  term: string,
  filters: {[string]: string[]},
  from: number,
  size: number,
): Promise<HttpDocResp> => {
  const body = {
    from,
    size,
    filters,
    q: term,
  };

  return fetch(`${baseUrl}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
};

export const documents = (
  exists: string[],
  companies: string[],
  systems: string[],
  authorities: string[],
  departments: string[],
  sources: string[],
  from: number,
  size: number,
): Promise<HttpDocResp> => {
  const url = new URL(`${baseUrl}/documents`);
  exists.forEach((field) => url.searchParams.append("exists", field));
  companies.forEach((field) => url.searchParams.append("companies", field));
  systems.forEach((field) => url.searchParams.append("systems", field));
  authorities.forEach((field) => url.searchParams.append("authorities", field));
  departments.forEach((field) => url.searchParams.append("departments", field));
  sources.forEach((field) => url.searchParams.append("sources", field));
  url.searchParams.append("from", from.toString());
  url.searchParams.append("size", size.toString());
  return fetch(url).then((resp) => resp.json());
};

export const document = (id: string): Promise<HttpFullDocResp> =>
  fetch(`${baseUrl}/documents/${id}`).then((resp) => resp.json());

export const companySystemInsights = (): Promise<HttpCompSysInsightResp> => {
  const url = `${baseUrl}/insights/companies-systems`;
  return fetch(url).then((resp) => resp.json());
};

export const authorityInsights = (): Promise<HttpAuthorityInsightResp> => {
  const url = `${baseUrl}/insights/authorities`;
  return fetch(url).then((resp) => resp.json());
};

export const departmentInsights = (): Promise<HttpAuthorityInsightResp> => {
  const url = `${baseUrl}/insights/departments`;
  return fetch(url).then((resp) => resp.json());
};

export const documentStats = (): Promise<HttpStatResp> => {
  const url = `${baseUrl}/stats/documents`;
  return fetch(url).then((resp) => resp.json());
};

export const sourceInsights = (): Promise<HttpInsightResp> => {
  const url = `${baseUrl}/insights/sources`;
  return fetch(url).then((resp) => resp.json());
};

export const predictiveAnalyticsImpacts = (): Promise<HttpPredictiveAnalyticsImpactResp> => {
  const url = `${baseUrl}/impacts/predictive-analytics`;
  return fetch(url).then((resp) => resp.json());
};
