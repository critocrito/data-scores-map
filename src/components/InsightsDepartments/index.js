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
    store.clearAllFilters();
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
        <div className="w-100">
          <span
            className="one"
            tooltip="A legacy categorisation used to refer to older non-departmental public bodies with tribunal functions. Under the reform of public bodies initiated by the 2010 coalition government - namely, the government’s attempts to crack down on “quangos” - all new tribunal functions must be established within Her Majesty’s Courts and Tribunals Service."
            flow="down"
          >
            <svg height="20" width="30">
              <circle cx="18" cy="14" r="5" fill="#b79a20" />
            </svg>
            Tribunal NDPB
          </span>

          <span
            tooltip="A non-financial public corporation is one which produces good and services for sale and has at least 50 percent of its production costs covered by these sales."
            flow="down"
          >
            <svg height="20" width="30">
              <circle cx="18" cy="14" r="5" fill="#54a24b" />
            </svg>
            NDPB and a non-financial public corporation
          </span>

          <span
            tooltip="A non-departmental public body with advisory functions."
            flow="down"
          >
            <svg height="20" width="30">
              <circle cx="18" cy="14" r="5" fill="#ffbf79" />
            </svg>
            NDPB with advisory functions
          </span>

          <span
            tooltip="A non-ministerial department is a government department in its own right but does not have its own minister. It is, however, accountable to Parliament through its sponsoring ministers. A non-ministerial department is staffed by civil servants and usually has its own estimate and accounts."
            flow="down"
          >
            <svg height="20" width="30">
              <circle cx="18" cy="14" r="5" fill="#88d27a" />
            </svg>
            Non Ministerial Department
          </span>

          <span
            className="button pointer"
            tooltip="Executive agencies are clearly designated units of a central government department, administratively distinct, but remaining legally part of it. They have a clear focus on delivering specific outputs within a framework of accountability to ministers."
            flow="down"
          >
            <svg height="20" width="30">
              <circle cx="18" cy="14" r="5" fill="#f58517" />
            </svg>
            Executive Agency
          </span>

          <span
            tooltip="A non-departmental public body (NDPB) is a body which has a role in the processes of national government, but is not a government department or part of one, and which accordingly operates to a greater or lesser extent at arm’s length from ministers. NDPBs have different roles, including those that advise ministers and others which carry out executive or regulatory functions, and they work within a strategic framework set by ministers."
            flow="down"
          >
            <svg height="20" width="30">
              <circle cx="18" cy="14" r="5" fill="#9dc9e9" />
            </svg>
            NDPB
          </span>
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
