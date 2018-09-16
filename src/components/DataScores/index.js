// @flow
import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Insights from "../Insights";
import DocumentsIndex from "../DocumentsIndex";
import DocumentsDetails from "../DocumentsDetails";
import Context from "../../lib/context";

const DataScores = () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/insights/companies-systems" />}
      />
      <Route
        exact
        path="/insights"
        render={() => <Redirect to="/insights/companies-systems" />}
      />
      <Route
        exact
        path="/insights/companies-systems"
        render={() => <Insights activeInsight="companies-systems" />}
      />
      <Route
        exact
        path="/insights/authorities"
        render={() => <Insights activeInsight="authorities" />}
      />
      <Route
        exact
        path="/insights/departments"
        render={() => <Insights activeInsight="departments" />}
      />
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
