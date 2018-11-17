// @flow
import * as React from "react";
import {observer} from "mobx-react";

import FilterTags from "../FilterTags";
import DocumentsTable from "../DocumentsTable";
import InsightsVizDoubleBarChart from "../InsightsVizDoubleBarChart";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

@observer
class InsightsCompaniesSystems extends React.Component<Props> {
  componentDidMount() {
    const {store} = this.props;
    store.clearAllFilters();
    if (store.companySystemInsights.length === 0)
      store.fetchCompanySystemInsights();
    this.fetchDocuments(0);
  }

  componentWillUnmount() {
    const {store} = this.props;
    store.clearAllFilters();
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
        <div className="w-100 pt3 dn di-ns">
          <InsightsVizDoubleBarChart
            companiesSystems={store.companySystemInsights}
            fetchDocuments={() => this.fetchDocuments(0)}
            store={store}
          />
        </div>
        {(store.companyFilters || []).length > 0 ||
        (store.systemFilters || []).length > 0 ? (
          <FilterTags
            companyFilters={store.companyFilters || []}
            systemFilters={store.systemFilters || []}
            authorityFilters={[]}
            departmentFilters={[]}
            clearFilters={() => {
              store.clearAllFilters();
              this.fetchDocuments(0);
            }}
            updateFilters={(type, filters) => {
              store.updateFilters(type, filters);
              this.fetchDocuments(0);
            }}
          />
        ) : (
          ""
        )}
        <section className="w-100 ph1-ns mt3">
          <DocumentsTable
            documents={store.documents}
            documentsTotal={store.documentsTotal}
            documentsPage={store.documentsPage}
            paginateDocuments={this.fetchDocuments}
            pageSize={store.pageSize}
          />
        </section>
      </div>
    );
  }
}

export default InsightsCompaniesSystems;
