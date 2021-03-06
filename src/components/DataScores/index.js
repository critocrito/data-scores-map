// @flow
import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "../Home";
import Insights from "../Insights";
import DocumentsIndex from "../DocumentsIndex";
import DocumentsDetails from "../DocumentsDetails";
import CaseStudies from "../CaseStudies";
import Methodology from "../Methodology";
import ImpactPredictiveAnalytics from "../ImpactPredictiveAnalytics";
import Context from "../../lib/context";

const DataScores = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
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
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/methodology" component={Methodology} />
      <Route
        exact
        path="/overviews"
        render={() => <Redirect to="/overviews/predictive-analytics" />}
      />
      <Route
        exact
        path="/overviews/predictive-analytics"
        render={() => (
          <Context.Consumer>
            {({store}) => <ImpactPredictiveAnalytics store={store} />}
          </Context.Consumer>
        )}
      />

      {/* Make sure this is last, otherwise follow up routes are not matched. */}
      <Route path="/:documentId" component={DocumentsDetails} />
    </Switch>
  </Router>
);

export default DataScores;
