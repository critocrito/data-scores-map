// @flow
import * as React from "react";
import {Link, withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

const DataView = withRouter(
  observer(({store}: Props) => {
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
      {
        Header: "Actions",
        accessor: "id",
        // eslint-disable-next-line react/display-name
        Cell: e => (
          <Link to={{pathname: `/${e.value}`}}>
            <i className="fas fa-angle-right" />
          </Link>
        ),
      },
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
  }),
);
export default withRouter(DataView);
