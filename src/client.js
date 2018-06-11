// @flow
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import "./client.css";
import App from "./components/App";
import {fetchCouncils} from "./lib/requests";
import Store from "./lib/store";
import {SearchContext, DocumentContext} from "./lib/contexts";
import SearchStore from "./stores/search";
import DocumentStore from "./stores/document";

const initialize = async () => {
  const store = new Store();
  const elem = document.getElementById("root");
  if (!elem) {
    throw new Error("No HTML element to mount React.");
  }
  ReactDOM.render(
    <Router>
      <SearchContext.Provider value={{store: new SearchStore()}}>
        <DocumentContext.Provider value={{store: new DocumentStore()}}>
          <App store={store} />
        </DocumentContext.Provider>
      </SearchContext.Provider>
    </Router>,
    elem,
  );

  await fetchCouncils().then(({data}) => store.setCouncils(data));
};

initialize();
