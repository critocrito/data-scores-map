// @flow
import * as React from "react";
import {withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {parse as parseQueryString} from "query-string";
import type {Location} from "react-router-dom";

import "./index.css";
import Header from "../Header";
import DocumentsFilters from "../DocumentsFilters";
import DocumentsFiltersButton from "../DocumentsFiltersButton";
import DocumentsTable from "../DocumentsTable";
import type Store from "../../lib/store";

type Props = {
  store: Store,
  location: Location,
};

type State = {
  searchTerm: string,
  filtersOpen: boolean,
};

@observer
class DocumentsIndex extends React.Component<Props, State> {
  state = {
    searchTerm: "",
    filtersOpen: false,
  };

  constructor(props) {
    super(props);
    const {q} = parseQueryString(props.location.search);
    if (q != null) {
      const searchTerm = Array.isArray(q) ? q[0] : q;
      this.state.searchTerm = searchTerm;
      this.fetchDocuments(0);
    }
  }

  handleChange = (ev) => {
    this.setState({searchTerm: ev.target.value});
  };

  handleClear = (ev) => {
    if (ev.keyCode === 27) this.clear();
  };

  clear = () => {
    const {store} = this.props;
    store.clearDocuments();
    this.setState({searchTerm: ""});
  };

  toggleFiltersNav = () => {
    const {filtersOpen} = this.state;
    this.setState({filtersOpen: !filtersOpen});
  };

  fetchDocuments = (from: number) => {
    const {store} = this.props;
    const {searchTerm} = this.state;
    store.searchDocuments(searchTerm.trim(), from);
  };

  render() {
    const {store} = this.props;
    const {filtersOpen, searchTerm} = this.state;

    return (
      <div>
        <Header />
        <article className="cf ph2-ns flex flex-column">
          <div className="mt3 pt5-ns mt5-ns tc">
            <form role="search">
              <span className="bb bw3 b--primary-color pb3">
                <input
                  name="q"
                  className="search-bar input-reset pl4 bb bw3 b--primary-color"
                  type="search"
                  value={searchTerm}
                  onChange={this.handleChange}
                  onKeyDown={this.handleClear}
                  placeholder="Documents Index"
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Search for documents."
                />
              </span>
            </form>
          </div>
          {filtersOpen ? (
            <div>
              <DocumentsFilters
                store={store}
                isOpen={filtersOpen}
                toggleFilters={this.toggleFiltersNav}
              />
              <div className="dn db-ns pt2">
                <DocumentsFiltersButton
                  isOpen
                  clickHandler={this.toggleFiltersNav}
                />
              </div>
            </div>
          ) : (
            <div className="pt5">
              <DocumentsFiltersButton
                isOpen={false}
                clickHandler={this.toggleFiltersNav}
              />
            </div>
          )}
          <DocumentsTable
            documents={store.documents}
            documentsTotal={store.documentsTotal}
            paginateDocuments={this.fetchDocuments}
            pageSize={store.pageSize}
          />
        </article>
      </div>
    );
  }
}

export default withRouter(DocumentsIndex);
