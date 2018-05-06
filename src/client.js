// @flow
import React from "react";
import ReactDOM from "react-dom";
import "./client.css";
import App from "./components/App";
import log from "./lib/logging";
import type {HttpDocResp, HttpCityResp} from "./lib/types";

const fetchCities = (): Promise<HttpCityResp> =>
  fetch("http://localhost:4000/cities").then(resp => resp.json());

const fetchDocuments = (): Promise<HttpDocResp> =>
  fetch("http://localhost:4000/units", {
    method: "POST",
    body: JSON.stringify({}),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then(resp => resp.json());

const initialize = async () => {
  const cities = await fetchCities();
  const documents = await fetchDocuments();
  const elem = document.getElementById("root");
  if (!elem) {
    throw new Error("No HTML element to mount React.");
  }
  ReactDOM.render(
    <App cities={cities.data} documents={documents.data} />,
    elem,
  );
};

initialize();

log.info("Client started.");
