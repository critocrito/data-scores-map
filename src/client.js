// @flow
import React from "react";
import ReactDOM from "react-dom";
import "./client.css";
import App from "./components/App";
import log from "./lib/logging";
import type {HttpCityResp} from "./lib/types";

const fetchCities = (): Promise<HttpCityResp> =>
  fetch("http://localhost:4000/cities").then(resp => resp.json());

const initialize = async () => {
  const result = await fetchCities();
  const cities = result.data;
  const elem = document.getElementById("root");
  if (!elem) {
    throw new Error("No HTML element to mount React.");
  }
  ReactDOM.render(<App cities={cities} />, elem);
};

initialize();

log.info("Client started.");
