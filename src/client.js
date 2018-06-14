// @flow
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import "./client.css";

import DataNav from "./components/DataNav";
import SearchBar from "./components/SearchBar";
import CaseStudies from "./components/CaseStudies";
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
          <header className="pa3 w-100 flex justify-between items-end white bg-dark-gray">
            <h1 className="fl ma0 v-btm">Data Scores in the UK</h1>
            <nav className="f6 fw6 ttu tracked">
              <NavLink
                className="link dim white dib mr3"
                to="/"
                title="Map of Councils"
              >
                Map
              </NavLink>
              <NavLink
                className="link dim white dib mr3"
                to="/case-studies"
                title="About"
              >
                Case Studies
              </NavLink>
            </nav>
            <SearchContext.Consumer>
              {({store: searchStore}) => <SearchBar store={searchStore} />}
            </SearchContext.Consumer>
          </header>
          <div className="pa3 pt5 bg-white">
            <Switch>
              <Route exact path="/" render={() => <DataNav store={store} />} />
              <Route
                exact
                path="/case-studies"
                render={() => (
                  <SearchContext.Consumer>
                    {({store: searchStore}) => (
                      <CaseStudies searchStore={searchStore} />
                    )}
                  </SearchContext.Consumer>
                )}
              />
              <Route path="/:docId" render={() => <DataNav store={store} />} />
            </Switch>
          </div>
        </DocumentContext.Provider>
      </SearchContext.Provider>
    </Router>,
    elem,
  );

  await fetchCouncils().then(({data}) => store.setCouncils(data));
};

initialize();
