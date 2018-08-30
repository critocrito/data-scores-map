// @flow
import * as React from "react";

import "./index.css";
import DocumentsFiltersCheckbox from "../DocumentsFiltersCheckbox";
import DocumentsFiltersButton from "../DocumentsFiltersButton";
import type {Item} from "../../lib/types";

type Props = {
  filters: Item[],
  selections: string[],
  toggleNav: () => void,
  updateFilters: (string[]) => void,
  clearFilters: () => void,
};

type State = {
  checkedItems: Map<string, boolean>,
};

class DocumentsFiltersSelection extends React.Component<Props, State> {
  static emptyCheckedItems(filters: Item[]) {
    return filters.reduce((memo, {name}) => memo.set(name, false), new Map());
  }

  constructor(props: Props) {
    super(props);
    const {filters, selections} = props;
    const checkedItems = DocumentsFiltersSelection.emptyCheckedItems(filters);
    selections.forEach((selection) => checkedItems.set(selection, true));
    this.state = {checkedItems};
  }

  handleCheckItem = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {updateFilters} = this.props;
    const {checkedItems} = this.state;
    const {name, checked: isChecked} = e.target;
    checkedItems.set(name, isChecked);
    updateFilters(this.selectedFilters(checkedItems));
    this.setState({checkedItems});
  };

  selectedFilters = (checkedItems: Map<string, boolean>): string[] =>
    Array.from(checkedItems.entries())
      .filter(([, isChecked]) => isChecked)
      .map(([name]) => name);

  clearFilters = () => {
    const {filters, clearFilters} = this.props;
    clearFilters();
    const checkedItems = DocumentsFiltersSelection.emptyCheckedItems(filters);
    this.setState({checkedItems});
  };

  render() {
    const {filters, toggleNav} = this.props;
    const {checkedItems} = this.state;
    return (
      <div className="filter-box absolute-ns w-100-ns z-999-ns">
        <div className="ba bg-light-gray">
          <div className="center flex flex-column">
            <div className="flex flex-wrap mt3-ns">
              {filters.map(({id, name}) => (
                <DocumentsFiltersCheckbox
                  key={id}
                  id={id}
                  name={name}
                  checked={checkedItems.get(name) || false}
                  onChange={this.handleCheckItem}
                />
              ))}
            </div>

            <div className="w-100 flex-ns pa2">
              <button
                className="w-100 w-25-ns pa2 ml-auto-ns primary-color bg-transparent ba b--primary-color ttu pointer"
                type="button"
                onClick={this.clearFilters}
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
        <div className="w-100 dn db-ns">
          <DocumentsFiltersButton isOpen clickHandler={toggleNav} />
        </div>
      </div>
    );
  }
}

export default DocumentsFiltersSelection;
