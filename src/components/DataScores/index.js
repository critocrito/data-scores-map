// @flow
import * as React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Insights from "../Insights";
import DocumentsIndex from "../DocumentsIndex";
import DocumentsDetails from "../DocumentsDetails";
import Context from "../../lib/context";

const DataScores = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Insights} />
      <Route
        exact
        path="/documents"
        render={() => (
          <Context.Consumer>
            {({store}) => <DocumentsIndex store={store} />}
          </Context.Consumer>
        )}
      />
      <Route path="/:documentId" component={DocumentsDetails} />
    </Switch>
  </Router>
);

export default DataScores;
