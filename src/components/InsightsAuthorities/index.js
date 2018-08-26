// @flow
import * as React from "react";
import {observer} from "mobx-react";

import DocumentsTable from "../DocumentsTable";
import InsightsVizMap from "../InsightsVizMap";
import InsightsSideRow from "../InsightsSideRow";
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
    store.fetchDocuments(["authorities"], page);
  };

  render() {
    const {store} = this.props;
    return (
      <div className="cf mt3 ph1-ns">
        <div className="pa1 dn di-ns">
          <InsightsVizMap authorities={store.authorityInsights} />
        </div>
        <div className="flex">
          <aside className="w-100 pl1 w-third-ns dn di-ns">
            <ul className="list pl0">
              {store.authorityInsights.map(({id, name, count}) => (
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
      </div>
    );
  }
}

export default InsightsAuthorities;
