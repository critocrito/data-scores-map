// @flow
import * as React from "react";
import {observer} from "mobx-react";

import DocumentsTable from "../DocumentsTable";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

@observer
class InsightsCompaniesSystems extends React.Component<Props> {
  componentDidMount() {
    const {store} = this.props;
    if (store.companySystemInsights.length === 0)
      store.fetchCompanySystemInsights();
    this.fetchDocuments(0);
  }

  componentWillUnmount() {
    const {store} = this.props;
    store.clearDocuments();
  }

  fetchDocuments = (page: number) => {
    const {store} = this.props;
    store.fetchDocuments(["companies", "systems"], page);
  };

  render() {
    const {store} = this.props;
    return (
      <div className="cf mt3 ph1-ns flex flex-column">
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

export default InsightsCompaniesSystems;
