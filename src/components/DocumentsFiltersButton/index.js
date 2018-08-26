// @flow
import * as React from "react";

import "./index.css";

type Props = {
  isOpen: boolean,
  handler: () => void,
};

const DocumentsFiltersButton = ({isOpen, handler}: Props) => {
  const isClosed = !isOpen;
  return (
    <div>
      {/* <p className="tr ma4 dn db-ns">Remove all filters</p> */}
      <div
        className="flex flex-column tc"
        onClick={handler}
        onKeyPress={handler}
        role="button"
        tabIndex={0}
      >
        {isOpen ? <i className="pb4 filter-open">&nbsp;</i> : ""}
        <button
          className={`br4 bn pa3 w5 pointer center ${
            isOpen ? "bg-primary-color" : "bg-light-gray"
          }`}
          type="button"
        >
          Filters
        </button>
        {isClosed ? <i className="pb4 filter-closed">&nbsp;</i> : ""}
      </div>
    </div>
  );
};

export default DocumentsFiltersButton;
