// @flow
import * as React from "react";

import "./index.css";

type Props = {
  isOpen: boolean,
  clickHandler: () => void,
};

const DocumentsFiltersButton = ({isOpen, clickHandler}: Props) => {
  const isClosed = !isOpen;
  return (
    <div>
      {/* <p className="tr ma4 dn db-ns">Remove all filters</p> */}
      <div
        className="flex flex-column tc"
        onClick={clickHandler}
        onKeyPress={clickHandler}
        role="button"
        tabIndex={0}
      >
        {isOpen ? <i className="pb4 filter-open pointer">&nbsp;</i> : ""}
        <button
          className={`br4 bn pa3 w5 pointer center ${
            isOpen ? "bg-primary-color" : "bg-light-gray"
          }`}
          type="button"
        >
          Filters
        </button>
        {isClosed ? <i className="pb4 filter-closed pointer">&nbsp;</i> : ""}
      </div>
    </div>
  );
};

export default DocumentsFiltersButton;
