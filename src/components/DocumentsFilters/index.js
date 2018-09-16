// @flow
import * as React from "react";
import {observer} from "mobx-react";

import "./index.css";
import DocumentsFiltersSelection from "../DocumentsFiltersSelection";
import DocumentsFiltersItem from "../DocumentsFiltersItem";
import type Store from "../../lib/store";

type Props = {
  store: Store,
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
  }

  toggleFilterItem = (filter: string) => {
    const {activeFilter} = this.state;
    this.setState({activeFilter: filter === activeFilter ? "" : filter});
  };

  toggleFilterNav = () => {
    this.setState({activeFilter: ""});
  };

  updateFilters = (type: string, filters: string[]) => {
    const {store} = this.props;
    store.updateFilters(type, filters);
  };

  clearFilters = (type: string) => {
    const {store} = this.props;
    store.clearFilters(type);
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
      default:
        return {};
    }
  };

  render() {
    const {activeFilter} = this.state;

    return (
      <div className="flex-ns justify-around-ns pt4 mt2">
        <div className="w-100 w-25-ns">
          <DocumentsFiltersItem
            name="Companies"
            isActive={activeFilter === "companies"}
            handler={() => this.toggleFilterItem("companies")}
          />
          {activeFilter === "companies" ? (
            <div className="filter-box absolute-ns z-999-ns">
              <DocumentsFiltersSelection
                {...this.filterSelectionProps(activeFilter)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-100 w-25-ns">
          <DocumentsFiltersItem
            name="Systems"
            isActive={activeFilter === "systems"}
            handler={() => this.toggleFilterItem("systems")}
          />
          {activeFilter === "systems" ? (
            <div className="filter-box absolute-ns z-999-ns">
              <DocumentsFiltersSelection
                {...this.filterSelectionProps(activeFilter)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-100 w-25-ns">
          <DocumentsFiltersItem
            name="Authorities"
            isActive={activeFilter === "authorities"}
            handler={() => this.toggleFilterItem("authorities")}
          />
          {activeFilter === "authorities" ? (
            <div className="filter-box absolute-ns z-999-ns">
              <DocumentsFiltersSelection
                {...this.filterSelectionProps(activeFilter)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-100 w-25-ns">
          <DocumentsFiltersItem
            name="Departments"
            isActive={activeFilter === "departments"}
            handler={() => this.toggleFilterItem("departments")}
          />
          {activeFilter === "departments" ? (
            <div className="filter-box absolute-ns z-999-ns">
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
