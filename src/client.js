// @flow
import React from "react";
import ReactDOM from "react-dom";

import "./client.css";
import App from "./components/App";
import log from "./lib/logging";
import {fetchCities, fetchDocuments} from "./lib/requests";
import Store from "./lib/store";

const initialize = async () => {
  const [{data: cities}, {data: documents}] = await Promise.all([
    fetchCities(),
    fetchDocuments(),
  ]);
  const elem = document.getElementById("root");
  if (!elem) {
    throw new Error("No HTML element to mount React.");
  }
  const store = new Store(cities, documents);
  ReactDOM.render(<App store={store} />, elem);
};

initialize();

log.info("Client started.");
