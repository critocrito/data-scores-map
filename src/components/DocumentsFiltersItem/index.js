// @flow
import * as React from "react";

import "./index.css";

type Props = {
  name: string,
  isActive: boolean,
  handler: () => void,
};

const DocumentsFiltersItem = ({name, isActive, handler}: Props) => (
  <div>
    <div className="pointer">
      <div
        className={
          isActive
            ? "documents-filters-item pa3 white bg-primary-color"
            : "documents-filters-item pa3"
        }
        onClick={handler}
        onKeyPress={handler}
        role="button"
        tabIndex={0}
      >
        {name}{" "}
        <i
          className={isActive ? "filter-select-active fr" : "filter-select fr"}
        >
          &nbsp;
        </i>
      </div>
    </div>
  </div>
);

export default DocumentsFiltersItem;
