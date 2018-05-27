// @flow
import React from "react";
import ReactDOM from "react-dom";

import "./client.css";
import App from "./components/App";
import {fetchCities, fetchCouncils} from "./lib/requests";
import Store from "./lib/store";

const initialize = async () => {
  const store = new Store();
  const elem = document.getElementById("root");
  if (!elem) {
    throw new Error("No HTML element to mount React.");
  }
  ReactDOM.render(<App store={store} />, elem);

  await fetchCities().then(({data}) => store.setCities(data));
  await fetchCouncils().then(({data}) => store.setCouncils(data));
};

initialize();
