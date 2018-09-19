// @flow
import * as React from "react";
import {withRouter} from "react-router-dom";
import {observer} from "mobx-react";

import "./index.css";
import Header from "../Header";
import Footer from "../Footer";
import FilterTags from "../FilterTags";
import DocumentsFilters from "../DocumentsFilters";
import DocumentsSearchResults from "../DocumentsSearchResults";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

type State = {
  searchTerm: string,
  lastSearchTerm: null | string,
  filtersOpen: boolean,
};

@observer
class DocumentsIndex extends React.Component<Props, State> {
  state = {
    searchTerm: "",
    lastSearchTerm: null,
    filtersOpen: false,
  };

  handleChange = (ev) => {
    this.setState({searchTerm: ev.target.value});
  };

  handleClear = (ev) => {
    if (ev.keyCode === 27) this.clear();
  };

  handleSubmit = (ev) => {
    const {store} = this.props;
    const {searchTerm} = this.state;
    if (searchTerm.length === 0) return;
    ev.preventDefault();
    this.setState({filtersOpen: false, lastSearchTerm: searchTerm.trim()});
    store.searchDocuments(searchTerm.trim(), 0);
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

  render() {
    const {store} = this.props;
    const {filtersOpen, searchTerm, lastSearchTerm} = this.state;
    const hasFilters =
      (store.companyFilters || [])
        .concat(store.systemFilters)
        .concat(store.authorityFilters)
        .concat(store.departmentFilters).length > 0;

    return (
      <div>
        <Header />
        <article className="cf ph2-ns flex items-center bg-gradient">
          <div className="w-100 w-100-m w-50-ns pa4 ml5-ns">
            <h2 className="f-subheadline-ns f2 lh-solid primary-color ttu bl b--accentuated-color bw3 pl2 ">
              Document Index
            </h2>
            <p className="f4 i mid-gray">
            Specific word or phrase
            </p>
            <p className="f4 near-black">
          Here you can search within the whole database. You can find search terms or phrases in context categories.
            </p>


          </div>
          <div className="w-50-ns dn dn-m dt-ns">
            <img className="w-50 pl7" alt="" src="/images/search.png" />
          </div>
        </article>


        <article className="cf ph2-ns flex flex-column vh" >
          <div className=" pt5-ns center w-100  pb3 w-90-ns flex items-center justify-center">
            <form className="w-70" role="search" onSubmit={this.handleSubmit}>
              <input
                name="q"
                className="search-bar input-reset f3-ns f4  w-100 pa3  primary-color bb b--primary-color shadow-3"
                type="search"
                value={searchTerm}
                onChange={this.handleChange}
                onKeyDown={this.handleClear}
                placeholder="Search for a keyword or phrase enclosed by “ “"
                autoComplete="off"
                spellCheck="false"
                aria-label="Search for documents."
              />
            </form>
            <button
              className={`w-10 f3-ns f5 bg-white primary-color pa3 pointer center ${
                filtersOpen ? "primary-color" : "black"
              }`}
              type="button"
              onClick={this.toggleFiltersNav}
            >
              Filters
            </button>
          </div>
          {filtersOpen ? <DocumentsFilters store={store} /> : <div />}
          {hasFilters ? (
            <FilterTags
              companyFilters={store.companyFilters || []}
              systemFilters={store.systemFilters || []}
              authorityFilters={store.authorityFilters || []}
              departmentFilters={store.departmentFilters || []}
              clearFilters={() => store.clearAllFilters()}
              updateFilters={(type, filters) =>
                store.updateFilters(type, filters)
              }
            />
          ) : (
            ""
          )}
          <div className="pt5">
            {lastSearchTerm != null ? (
              <DocumentsSearchResults
                searchTerm={lastSearchTerm}
                store={store}
              />
            ) : (
              <div />
            )}
          </div>
        </article>
        <Footer />
      </div>
    );
  }
}

export default withRouter(DocumentsIndex);
