// @flow
import * as React from "react";

import DocumentsFiltersCheckbox from "../DocumentsFiltersCheckbox";
import type {Item} from "../../lib/types";

type Props = {
  filters: Item[],
  selections: string[],
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
    const {filters} = this.props;
    const {checkedItems} = this.state;
    return (
      <div className="ba b--moon-gray bg-white shadow-3">
        <div className="center flex flex-column pa3">
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
              className=" pa2 center primary-color f6 b mt4 bg-transparent ba b--primary-color ttu pointer"
              type="button"
              onClick={this.clearFilters}
            >
              Clear Selection
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DocumentsFiltersSelection;
