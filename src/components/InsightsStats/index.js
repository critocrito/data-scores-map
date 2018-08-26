// @flow
import * as React from "react";
import {observer} from "mobx-react";

import "./index.css";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

@observer
class InsightsStats extends React.Component<Props> {
  componentDidMount() {
    const {store} = this.props;
    store.fetchDocumentStats();
  }

  render() {
    const {store} = this.props;
    const documentStats = store.documentStats.filter(
      ({name}) => name === "documents",
    );
    const companySystemStats = store.documentStats.filter(
      ({name}) => name === "companies-systems",
    );
    const authorityStats = store.documentStats.filter(
      ({name}) => name === "authorities",
    );

    return (
      <div className="w-40-m pa2 center dn flex-ns flex-column-ns">
        <div className="w-100 flex flex-column pa1 ma1">
          <span className="center">
            <i className="document-icon h3 w3 ba br-100 bw1 b--primary-color db v-mid shadow-5">
              &nbsp;
            </i>
          </span>
          <span className="f2 roboto center tc ma1 pa1">
            {documentStats != null && documentStats.length > 0
              ? documentStats[0].count
              : ""}
          </span>
          <span className="center tc">
            Based on <span className="primary-color">Categories</span>
          </span>
        </div>
        <div className="w-100 flex justify-between">
          <div className="w-50 flex flex-column pa1 ma1">
            <span className="center">
              <i className="document-icon h3 w3 ba br-100 bw1 b--primary-color db v-mid shadow-5">
                &nbsp;
              </i>
            </span>
            <span className="f2 roboto center tc ma1 pa1">
              {companySystemStats != null && companySystemStats.length > 0
                ? companySystemStats[0].count
                : ""}
            </span>
            <span className="center tc">
              Mentions of{" "}
              <span className="primary-color">Companies or Systems</span>
            </span>
          </div>
          <div className="w-50 flex flex-column pa1 ma1">
            <span className="center">
              <i className="document-icon h3 w3 ba br-100 bw1 b--primary-color db v-mid shadow-5">
                &nbsp;
              </i>
            </span>
            <span className="f2 roboto center tc ma1 pa1">
              {authorityStats != null && authorityStats.length > 0
                ? authorityStats[0].count
                : ""}
            </span>
            <span className="center tc">
              Located by{" "}
              <span className="primary-color">Local Authorities</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default InsightsStats;
