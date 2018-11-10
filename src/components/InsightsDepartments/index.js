// @flow
import * as React from "react";
import {observer} from "mobx-react";

import FilterTags from "../FilterTags";
import InsightsVizTreeMap from "../InsightsVizTreeMap";
import DocumentsTable from "../DocumentsTable";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

@observer
class InsightsDepartments extends React.Component<Props> {
  componentDidMount() {
    const {store} = this.props;
    store.clearAllFilters();
    if (store.departmentInsights.length === 0) store.fetchDepartmentInsights();
    this.fetchDocuments(0);
  }

  componentWillUnmount() {
    const {store} = this.props;
    store.clearDocuments();
  }

  fetchDocuments = (page: number) => {
    const {store} = this.props;
    store.fetchDocuments(["departments"], page);
  };

  render() {
    const {store} = this.props;
    return (
      <div className="cf mt3 ph1-ns flex flex-column">
        <div className="w-100 pt3 dn di-ns">
          <InsightsVizTreeMap departments={store.departmentInsights} />
        </div>
        {(store.departmentFilters || []).length > 0 ? (
          <FilterTags
            companyFilters={[]}
            systemFilters={[]}
            authorityFilters={[]}
            departmentFilters={store.departmentFilters || []}
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

export default InsightsDepartments;
