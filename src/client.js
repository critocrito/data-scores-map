// @flow
import React from "react";
import ReactDOM from "react-dom";
import "./client.css";
import App from "./components/App";
import log from "./lib/logging";
import {fetchCities, fetchDocuments} from "./lib/requests";

const initialize = async () => {
  const [{data: cities}, {data: documents}] = await Promise.all([
    fetchCities(),
    fetchDocuments(),
  ]);
  const elem = document.getElementById("root");
  if (!elem) {
    throw new Error("No HTML element to mount React.");
  }
  ReactDOM.render(<App cities={cities} documents={documents} />, elem);
};

initialize();

log.info("Client started.");
