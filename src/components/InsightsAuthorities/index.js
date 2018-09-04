// @flow
import * as React from "react";
import {observer} from "mobx-react";

import DocumentsTable from "../DocumentsTable";
import InsightsVizMap from "../InsightsVizMap";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

@observer
class InsightsAuthorities extends React.Component<Props> {
  componentDidMount() {
    const {store} = this.props;
    if (store.authorityInsights.length === 0) store.fetchAuthorityInsights();
    this.fetchDocuments(0);
  }

  componentWillUnmount() {
    const {store} = this.props;
    store.clearDocuments();
  }

  fetchDocuments = (page: number) => {
    const {store} = this.props;
    store.fetchDocuments(["authorities"], [], page);
  };

  render() {
    const {store} = this.props;
    return (
      <div className="cf mt3 ph1-ns flex flex-column">
        <div className="w-100 pt3 dn di-ns">
          <InsightsVizMap authorities={store.authorityInsights} />
        </div>
        <section className="w-100 ph1-ns mt3">
          <DocumentsTable
            documents={store.documents}
            documentsTotal={store.documentsTotal}
            paginateDocuments={this.fetchDocuments}
            pageSize={store.pageSize}
          />
        </section>
      </div>
    );
  }
}

export default InsightsAuthorities;
