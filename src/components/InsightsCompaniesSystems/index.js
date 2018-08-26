// @flow
import * as React from "react";
import {observer} from "mobx-react";

import DocumentsTable from "../DocumentsTable";
import InsightsCompaniesSystemsRow from "../InsightsCompaniesSystemsRow";
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
      <div className="cf mt3 ph1-ns flex">
        <aside className="w-100 pl1 w-third-ns dn di-ns">
          <table className="collapse">
            <thead>
              <tr>
                <td className="pv2 ph3 tc b fw6 ttu bb">Companies</td>
                <td className="pv2 ph3 tc b fw6 ttu bb">Systems</td>
              </tr>
            </thead>
            <tbody>
              {store.companySystemInsights.map(({id, name, systems}) => (
                <InsightsCompaniesSystemsRow
                  key={id}
                  name={name}
                  systems={systems}
                />
              ))}
            </tbody>
          </table>
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

export default InsightsCompaniesSystems;
