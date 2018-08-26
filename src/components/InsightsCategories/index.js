// @flow
import * as React from "react";
import {observer} from "mobx-react";

import DocumentsTable from "../DocumentsTable";
import InsightsSideRow from "../InsightsSideRow";
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
      <div className="cf mt3 ph1-ns flex">
        <aside className="w-100 pl1 w-third-ns dn di-ns">
          <ul className="list pl0">
            {store.categoryInsights.map(({id, name, count}) => (
              <InsightsSideRow key={id} name={name} count={count} />
            ))}
          </ul>
        </aside>
        <section className="w-100 w-two-thirds-ns">
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
