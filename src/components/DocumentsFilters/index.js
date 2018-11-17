// @flow
import * as React from "react";
import {observer} from "mobx-react";

import "./index.css";
import DocumentsFiltersSelection from "../DocumentsFiltersSelection";
import DocumentsFiltersItem from "../DocumentsFiltersItem";
import type Store from "../../lib/store";

type Props = {
  store: Store,
  // $FlowFixMe
  update: () => any,
};

type State = {
  activeFilter: string,
};

@observer
class DocumentsFilters extends React.Component<Props, State> {
  state = {
    activeFilter: "",
  };

  componentDidMount() {
    const {store} = this.props;
    if (store.companies.length === 0 || store.systems.length === 0)
      store.fetchCompaniesSystems();
    if (store.authorities.length === 0) store.fetchAuthorities();
    if (store.departments.length === 0) store.fetchDepartments();
    if (store.sources.length === 0) store.fetchSources();
  }

  toggleFilterItem = (filter: string) => {
    const {activeFilter} = this.state;
    this.setState({activeFilter: filter === activeFilter ? "" : filter});
  };

  toggleFilterNav = () => {
    this.setState({activeFilter: ""});
  };

  updateFilters = (type: string, filters: string[]) => {
    const {store, update} = this.props;
    store.updateFilters(type, filters);
    update();
  };

  clearFilters = (type: string) => {
    const {store, update} = this.props;
    store.clearFilters(type);
    update();
  };

  filterSelectionProps = (active: string) => {
    const {store} = this.props;
    const props = {
      selections: store.documentsFilters.get(active) || [],
      updateFilters: (filters: string[]) => this.updateFilters(active, filters),
      clearFilters: () => this.clearFilters(active),
    };
    switch (active) {
      case "companies":
        return Object.assign({}, props, {filters: store.companies});
      case "systems":
        return Object.assign({}, props, {filters: store.systems});
      case "authorities":
        return Object.assign({}, props, {filters: store.authorities});
      case "departments":
        return Object.assign({}, props, {filters: store.departments});
      case "sources":
        return Object.assign({}, props, {filters: store.sources});
      default:
        return {};
    }
  };

  render() {
    const {activeFilter} = this.state;

    return (
      <div className="flex-ns justify-around-ns pt3 mt2 w-90 center ">
        <div className="w-100 w-20-ns">
          <DocumentsFiltersItem
            name="Companies"
            isActive={activeFilter === "companies"}
            handler={() => this.toggleFilterItem("companies")}
          />
          {activeFilter === "companies" ? (
            <div className="filter-box absolute-ns mh5 fn-m ">
              <DocumentsFiltersSelection
                {...this.filterSelectionProps(activeFilter)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-100 w-20-ns">
          <DocumentsFiltersItem
            name="Systems"
            isActive={activeFilter === "systems"}
            handler={() => this.toggleFilterItem("systems")}
          />
          {activeFilter === "systems" ? (
            <div className="filter-box absolute-ns mh5 fn-m ">
              <DocumentsFiltersSelection
                {...this.filterSelectionProps(activeFilter)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-100 w-20-ns">
          <DocumentsFiltersItem
            name="Authorities"
            isActive={activeFilter === "authorities"}
            handler={() => this.toggleFilterItem("authorities")}
          />
          {activeFilter === "authorities" ? (
            <div className="filter-box absolute-ns mh5 fn-m ">
              <DocumentsFiltersSelection
                {...this.filterSelectionProps(activeFilter)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-100 w-20-ns">
          <DocumentsFiltersItem
            name="Departments"
            isActive={activeFilter === "departments"}
            handler={() => this.toggleFilterItem("departments")}
          />
          {activeFilter === "departments" ? (
            <div className="filter-box absolute-ns mh5 fn-m ">
              <DocumentsFiltersSelection
                {...this.filterSelectionProps(activeFilter)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-100 w-20-ns">
          <DocumentsFiltersItem
            name="Sources"
            isActive={activeFilter === "sources"}
            handler={() => this.toggleFilterItem("sources")}
          />
          {activeFilter === "sources" ? (
            <div className="filter-box absolute-ns mh5 fn-m ">
              <DocumentsFiltersSelection
                {...this.filterSelectionProps(activeFilter)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default DocumentsFilters;
