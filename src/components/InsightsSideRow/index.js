// @flow
import * as React from "react";

type Props = {
  name: string,
  count: number,
};

const InsightsSideRow = ({name, count}: Props) => (
  <li>
    <div className="silver">
      {name}: ({count})
    </div>
  </li>
);

export default InsightsSideRow;
