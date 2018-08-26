// @flow
import * as React from "react";
import {observer} from "mobx-react";

import "./index.css";
import DocumentsFiltersSelection from "../DocumentsFiltersSelection";
import DocumentsFiltersItem from "../DocumentsFiltersItem";
import DocumentsFiltersButton from "../DocumentsFiltersButton";
import type Store from "../../lib/store";

type Props = {
  store: Store,
  isOpen: boolean,
  toggleFilters: () => void,
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
    if (store.categories.length === 0) store.fetchCategories();
    if (store.companies.length === 0 || store.systems.length === 0)
      store.fetchCompaniesSystems();
    if (store.authorities.length === 0) store.fetchAuthorities();
  }

  toggleFilterItem = (filter: string) => {
    const {activeFilter} = this.state;
    this.setState({activeFilter: filter === activeFilter ? "" : filter});
  };

  toggleFilterNav = () => {
    const {toggleFilters} = this.props;
    toggleFilters();
    this.setState({
      activeFilter: "",
    });
  };

  updateFilters = (type: string, filters: string[]) => {
    const {store} = this.props;
    store.updateFilters(type, filters);
  };

  clearFilters = (type: string) => {
    const {store} = this.props;
    store.clearFilters(type);
  };

  render() {
    const {store, isOpen} = this.props;
    const {activeFilter} = this.state;

    return (
      <div>
        <div className="relative ml2 mr2">
          <div className="flex-ns justify-around-ns mt4 pt4">
            <div className="w-100 w-25-ns ba">
              <DocumentsFiltersItem
                name="Categories"
                isActive={activeFilter === "categories"}
                handler={() => this.toggleFilterItem("categories")}
              />
              {activeFilter === "categories" ? (
                <DocumentsFiltersSelection
                  filters={store.categories}
                  selections={store.documentsFilters.get("categories") || []}
                  toggleNav={() => this.toggleFilterNav()}
                  updateFilters={(filters) =>
                    this.updateFilters("categories", filters)
                  }
                  clearFilters={() => this.clearFilters("categories")}
                />
              ) : (
                ""
              )}
            </div>
            <div className="w-100 w-25-ns ba">
              <DocumentsFiltersItem
                name="Companies"
                isActive={activeFilter === "companies"}
                handler={() => this.toggleFilterItem("companies")}
              />
              {activeFilter === "companies" ? (
                <DocumentsFiltersSelection
                  filters={store.companies}
                  selections={store.documentsFilters.get("companies") || []}
                  toggleNav={() => this.toggleFilterNav()}
                  updateFilters={(filters) =>
                    this.updateFilters("companies", filters)
                  }
                  clearFilters={() => this.clearFilters("companies")}
                />
              ) : (
                ""
              )}
            </div>
            <div className="w-100 w-25-ns ba">
              <DocumentsFiltersItem
                name="Systems"
                isActive={activeFilter === "systems"}
                handler={() => this.toggleFilterItem("systems")}
              />
              {activeFilter === "systems" ? (
                <DocumentsFiltersSelection
                  filters={store.systems}
                  selections={store.documentsFilters.get("systems") || []}
                  toggleNav={() => this.toggleFilterNav()}
                  updateFilters={(filters) =>
                    this.updateFilters("systems", filters)
                  }
                  clearFilters={() => this.clearFilters("systems")}
                />
              ) : (
                ""
              )}
            </div>
            <div className="w-100 w-25-ns ba">
              <DocumentsFiltersItem
                name="Authorities"
                isActive={activeFilter === "authorities"}
                handler={() => this.toggleFilterItem("authorities")}
              />
              {activeFilter === "authorities" ? (
                <DocumentsFiltersSelection
                  filters={store.authorities}
                  selections={store.documentsFilters.get("authorities") || []}
                  toggleNav={() => this.toggleFilterNav()}
                  updateFilters={(filters) =>
                    this.updateFilters("authorities", filters)
                  }
                  clearFilters={() => this.clearFilters("authorities")}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="dn-ns db pt2">
          <DocumentsFiltersButton
            isOpen={isOpen}
            handler={() => this.toggleFilterNav()}
          />
        </div>
      </div>
    );
  }
}

export default DocumentsFilters;
