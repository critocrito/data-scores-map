// @flow
import * as React from "react";
import {observer} from "mobx-react";
// $FlowFixMe
import ReactTable from "react-table";
// $FlowFixMe
import "react-table/react-table.css";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

const DataView = observer(({store}: Props) => {
  const columns = [
    {Header: "Title", accessor: "title"},
    {Header: "Description", accessor: "description"},
    {
      Header: "URL",
      // eslint-disable-next-line react/display-name
      Cell: e => <a href={e.value}> {e.value} </a>,
      accessor: "href",
    },
    {Header: "Search Category", accessor: "searchCategory"},
  ];

  return (
    <div>
      <ReactTable
        data={store.documents}
        columns={columns}
        filterable
        defaultFilterMethod={(filter, row) => {
          const r = new RegExp(filter.value, "ig");
          return r.test(String(row[filter.id]));
        }}
      />
    </div>
  );
});
export default DataView;
