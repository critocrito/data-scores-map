// @flow
import * as React from "react";
import {withRouter} from "react-router-dom";
import {observer} from "mobx-react";

import "./index.css";
import Header from "../Header";
import FilterTags from "../FilterTags";
import DocumentsFilters from "../DocumentsFilters";
import DocumentsSearchResults from "../DocumentsSearchResults";
import DocumentsIndexHelp from "../DocumentsIndexHelp";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

type State = {
  searchTerm: string,
  lastSearchTerm: null | string,
  filtersOpen: boolean,
  helpOpen: boolean,
};

@observer
class DocumentsIndex extends React.Component<Props, State> {
  state = {
    searchTerm: "",
    lastSearchTerm: null,
    filtersOpen: false,
    helpOpen: false,
  };

  componentDidMount() {
    const {store} = this.props;
    const {searchTerm} = this.state;
    store.clearAllFilters();
    store.searchDocuments(searchTerm.trim(), 0);
  }

  componentWillUnmount() {
    const {store} = this.props;
    store.clearAllFilters();
    store.clearDocuments();
  }

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
    this.setState({
      helpOpen: false,
      filtersOpen: false,
      lastSearchTerm: searchTerm.trim(),
    });
    store.searchDocuments(searchTerm.trim(), 0);
  };

  clear = () => {
    const {store} = this.props;
    this.setState({searchTerm: "", lastSearchTerm: null});
    store.clearDocuments();
    store.searchDocuments("", 0);
  };

  toggleFiltersNav = () => {
    const {filtersOpen} = this.state;
    this.setState({filtersOpen: !filtersOpen, helpOpen: false});
  };

  toggleHelp = () => {
    const {helpOpen} = this.state;
    this.setState({helpOpen: !helpOpen, filtersOpen: false});
  };

  render() {
    const {store} = this.props;
    const {filtersOpen, searchTerm, lastSearchTerm, helpOpen} = this.state;
    const hasFilters =
      (store.companyFilters || [])
        .concat(store.systemFilters)
        .concat(store.authorityFilters)
        .concat(store.departmentFilters)
        .concat(store.sourceFilters).length > 0;

    const help = (
      <div>
        <DocumentsIndexHelp />
      </div>
    );

    return (
      <div>
        <Header />
        <article className="cf ph2-ns flex items-center bg-gradient">
          <div className="w-100 w-100-m w-50-ns pa4 ml5-ns">
            <h2 className="f-subheadline-ns f2 lh-solid primary-color ttu bw3 ">
              Document Index
            </h2>
            <p className="f4 i mid-gray">Specific word or phrase</p>
            <p className="f4 near-black">
              Here you can search within the whole database. You can find search
              terms or phrases in context categories.
            </p>
          </div>
          <div className="w-50-ns dn dn-m dt-ns">
            <img className="w-40 pl7 pb2" alt="" src="/images/search.png" />
          </div>
        </article>

        <article className="cf ph2-ns flex flex-column vh">
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
              className={`w-10-ns f3-ns f5 bg-white primary-color pa3 pointer center ${
                filtersOpen ? "primary-color" : "black"
              }`}
              type="button"
              onClick={this.toggleFiltersNav}
            >
              Filters
            </button>
            <button
              className="w-10-ns f3-ns f5 bg-white primary-color pa3 pointer center"
              type="button"
              onClick={this.toggleHelp}
            >
              Help
            </button>
          </div>
          {helpOpen ? help : ""}
          {filtersOpen ? (
            <DocumentsFilters
              store={store}
              update={() => store.searchDocuments(searchTerm, 0)}
            />
          ) : (
            <div />
          )}
          {hasFilters ? (
            <FilterTags
              companyFilters={store.companyFilters || []}
              systemFilters={store.systemFilters || []}
              authorityFilters={store.authorityFilters || []}
              departmentFilters={store.departmentFilters || []}
              sourceFilters={store.sourceFilters || []}
              entityFilters={[]}
              clearFilters={() => {
                store.clearAllFilters();
                store.searchDocuments(searchTerm, 0);
              }}
              updateFilters={(type, filters) => {
                store.updateFilters(type, filters);
                store.searchDocuments(searchTerm, 0);
              }}
            />
          ) : (
            ""
          )}
          <div className="pt5">
            <DocumentsSearchResults searchTerm={lastSearchTerm} store={store} />
          </div>
        </article>
      </div>
    );
  }
}

export default withRouter(DocumentsIndex);
