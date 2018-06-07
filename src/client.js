// @flow
import React from "react";
import ReactDOM from "react-dom";

import "./client.css";
import App from "./components/App";
import {fetchCouncils} from "./lib/requests";
import Store from "./lib/store";
import {SearchContext} from "./lib/contexts";
import SearchStore from "./stores/search";

const initialize = async () => {
  const store = new Store();
  const elem = document.getElementById("root");
  if (!elem) {
    throw new Error("No HTML element to mount React.");
  }
  ReactDOM.render(
    <SearchContext.Provider value={{store: new SearchStore()}}>
      <App store={store} />
    </SearchContext.Provider>,
    elem,
  );

  await fetchCouncils().then(({data}) => store.setCouncils(data));
};

initialize();
