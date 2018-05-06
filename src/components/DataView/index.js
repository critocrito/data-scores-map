// @flow
import * as React from "react";
// $FlowFixMe
import ReactTable from "react-table";
// $FlowFixMe
import "react-table/react-table.css";

import type {Document} from "../../lib/types";

type Props = {
  documents: Array<Document>,
};

const DataView = ({documents}: Props) => {
  const columns = [
    {Header: "Title", accessor: "title"},
    {Header: "Description", accessor: "description"},
    {
      Header: "URL",
      // eslint-disable-next-line react/display-name
      Cell: e => <a href={e.value}> {e.value} </a>,
      accessor: "href",
    },
    {Header: "Search Category", accessor: "search_category"},
  ];

  return (
    <div>
      <ReactTable
        data={documents}
        columns={columns}
        filterable
        defaultFilterMethod={(filter, row) => {
          const r = new RegExp(filter.value, "ig");
          return r.test(String(row[filter.id]));
        }}
      />
    </div>
  );
};

DataView.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  documents: [],
};
export default DataView;
