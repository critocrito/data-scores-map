// @flow
import React from "react";
import ReactDOM from "react-dom";

import "./client.css";

import Store from "./lib/store";
import Context from "./lib/context";
import DataScores from "./components/DataScores";

const initialize = async () => {
  const store = new Store();
  const elem = document.getElementById("root");
  if (!elem) {
    throw new Error("No HTML element to mount React.");
  }

  ReactDOM.render(
    <Context.Provider value={{store}}>
      <DataScores />
    </Context.Provider>,
    elem,
  );
};

initialize();
