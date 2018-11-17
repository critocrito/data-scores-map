// @flow
import * as React from "react";
import {observer} from "mobx-react";

import "./index.css";
import DocumentsCards from "../DocumentsCards";
import DocumentsTable from "../DocumentsTable";
import type Store from "../../lib/store";

type Props = {
  searchTerm: string | null,
  store: Store,
};

type State = {
  resultsView: "list" | "card",
};

@observer
class DocumentsSearchResults extends React.Component<Props, State> {
  state = {
    resultsView: "card",
  };

  switchResultsView = (view: "list" | "card") => {
    const {resultsView} = this.state;
    if (view === resultsView) return;
    this.setState({resultsView: view});
  };

  paginateResults = (from: number) => {
    const {store, searchTerm} = this.props;
    store.searchDocuments(searchTerm, from);
  };

  render() {
    const {searchTerm, store} = this.props;
    const {resultsView} = this.state;
    const viewProps = {
      documents: store.documents,
      documentsTotal: store.documentsTotal,
      documentsPage: store.documentsPage,
      paginateDocuments: this.paginateResults,
      pageSize: store.pageSize,
    };

    const results =
      searchTerm != null ? (
        <span>
          Found <span className="b">{store.documentsTotal} documents</span> that
          contains: <em>{searchTerm}</em>
        </span>
      ) : (
        <span>
          Found <span className="b">{store.documentsTotal} documents</span>
        </span>
      );

    return (
      <div className="pt5">
        <div className="mv2 bb bw1 b--light-silver flex justify-between">
          {results}
          <div className="ma2 w-50" />
          <div className="ma2 w-25 tr">
            <button
              type="button"
              className="grid-button h2 w2"
              onClick={() => this.switchResultsView("card")}
            />
            <button
              type="button"
              className="bars-button h2 w2"
              onClick={() => this.switchResultsView("list")}
            />
          </div>
        </div>
        {resultsView === "card" ? (
          <DocumentsCards {...viewProps} />
        ) : (
          <DocumentsTable {...viewProps} />
        )}
      </div>
    );
  }
}

export default DocumentsSearchResults;
