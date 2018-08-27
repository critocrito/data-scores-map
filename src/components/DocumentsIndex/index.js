// @flow
import * as React from "react";
import {fromEvent} from "most";
import {observer} from "mobx-react";

import "./index.css";
import Header from "../Header";
import DocumentsFilters from "../DocumentsFilters";
import DocumentsFiltersButton from "../DocumentsFiltersButton";
import DocumentsTable from "../DocumentsTable";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

type State = {
  filtersOpen: boolean,
};

@observer
class DocumentsIndex extends React.Component<Props, State> {
  state = {
    filtersOpen: false,
  };

  componentDidMount() {
    fromEvent("input", this.inputElement)
      .map((ev) => ev.target.value.trim())
      .skipRepeats()
      .debounce(500)
      // .filter((term) => term.length > 1)
      .observe((term) => {
        if (term.length > 1) {
          this.searchTerm(term);
          this.fetchDocuments(0);
        } else {
          this.clear();
        }
      });
  }

  clear = () => {
    const {store} = this.props;
    store.clearDocuments();
    store.clearSearchTerm();
  };

  searchTerm = (term: string) => {
    const {store} = this.props;
    store.updateSearchTerm(term);
  };

  toggleFiltersNav = () => {
    const {filtersOpen} = this.state;
    this.setState({filtersOpen: !filtersOpen});
  };

  fetchDocuments = (from: number) => {
    const {store} = this.props;
    store.searchDocuments(from);
  };

  inputElement: ?HTMLInputElement;

  render() {
    const {store} = this.props;
    const {filtersOpen} = this.state;

    return (
      <div>
        <Header />
        <article className="cf ph2-ns flex flex-column">
          <div className="mt3 pt5-ns mt5-ns tc">
            <form role="search">
              <span className="bb bw3 b--primary-color pb3">
                <input
                  name="q"
                  // eslint-disable-next-line no-return-assign
                  ref={(element) => (this.inputElement = element)}
                  className="search-bar input-reset pl4 bb bw3 b--primary-color"
                  type="search"
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

export default DocumentsIndex;
