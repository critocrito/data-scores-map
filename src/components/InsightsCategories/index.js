// @flow
import * as React from "react";
import {observer} from "mobx-react";

import DocumentsTable from "../DocumentsTable";
import InsightsVizBarChart from "../InsightsVizBarChart";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

@observer
class InsightsCategories extends React.Component<Props> {
  componentDidMount() {
    const {store} = this.props;
    if (store.categoryInsights.length === 0) store.fetchCategoryInsights();
    this.fetchDocuments(0);
  }

  componentWillUnmount() {
    const {store} = this.props;
    store.clearDocuments();
  }

  fetchDocuments = (page: number) => {
    const {store} = this.props;
    store.fetchDocuments(["companies", "systems", "authorities"], page);
  };

  render() {
    const {store} = this.props;
    return (
      <div className="flex flex-column">
        <div className="w-100 pt3 dn di-ns">
          <InsightsVizBarChart categories={store.categoryInsights} />
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

export default InsightsCategories;
