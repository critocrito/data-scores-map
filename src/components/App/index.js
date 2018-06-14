// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import {fromEvent, fromPromise, merge, switchLatest} from "most";

import DataNav from "../DataNav";
import SearchBar from "../SearchBar";
import CaseStudies from "../CaseStudies";
import {SearchContext} from "../../lib/contexts";
import {search} from "../../lib/requests";
import type Store from "../../lib/store";
import type SearchStore from "../../stores/search";

type Props = {
  store: Store,
  searchStore: SearchStore,
};

@observer
class App extends React.Component<Props> {
  componentDidMount() {
    const {searchStore} = this.props;
    const searchText = fromEvent("selectionchange", document)
      .map(() => {
        const selection = document.getSelection();
        if (!selection || selection.isCollapsed) return "";
        return selection.toString();
      })
      .skipRepeats()
      .multicast();
    const results = searchText
      .filter(term => term.length > 1)
      .debounce(500)
      .map(search)
      .map(fromPromise)
      .thru(switchLatest)
      .filter(({data}) => data.length > 0)
      .map(({data}) => data);
    const emptyResults = searchText
      .filter(term => term.length <= 1)
      .constant([]);
    merge(emptyResults, results).observe(data => searchStore.setResults(data));
  }

  render() {
    const {store} = this.props;
    return (
      <Router>
        <div>
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
        </div>
      </Router>
    );
  }
}

export default App;
