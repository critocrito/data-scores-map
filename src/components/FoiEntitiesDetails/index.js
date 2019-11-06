// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {withRouter} from "react-router-dom";

import InsightsVizBubbleChart from "../InsightsVizBubbleChart";
import DocumentsTable from "../DocumentsTable";
import FilterTags from "../FilterTags";
import type Store from "../../lib/store";

type Props = {
  foi: string,
  store: Store,
};

@observer
class FoiEntitiesDetails extends React.Component<Props> {
  componentDidMount() {
    const {store} = this.props;
    const {foi} = this.props;
    store.clearAllFilters();
    store.fetchFoiEntities(foi);
    this.fetchDocuments(0);
  }

  componentWillUnmount() {
    const {store} = this.props;
    store.clearAllFilters();
    store.clearDocuments();
  }

  fetchDocuments = (page: number) => {
    const {foi, store} = this.props;
    store.fetchFoiEntityDocuments(foi, page);
  };

  render() {
    const {store} = this.props;

    return (
      <div className="cf mt3 ph1-ns flex flex-column">
        <div className="w-75-ns w-90 center pt3 di-ns">
          <InsightsVizBubbleChart
            entities={store.entities}
            fetchDocuments={() => this.fetchDocuments(0)}
            store={store}
          />
        </div>
        {(store.entityFilters || []).length > 0 ? (
          <FilterTags
            companyFilters={[]}
            systemFilters={[]}
            authorityFilters={[]}
            departmentFilters={[]}
            sourceFilters={[]}
            entityFilters={store.entityFilters || []}
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

export default withRouter(FoiEntitiesDetails);
