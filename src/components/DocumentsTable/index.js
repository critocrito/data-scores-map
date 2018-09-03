// @flow
import * as React from "react";

import DocumentsTableRow from "../DocumentsTableRow";
import type {Document} from "../../lib/types";

type Props = {
  documents: Document[],
  documentsTotal: number,
  paginateDocuments: (page: number) => void,
  pageSize: number,
};

type State = {
  page: number,
};

class DocumentsTable extends React.Component<Props, State> {
  state = {
    page: 0,
  };

  paginate = async (page: number) => {
    const {paginateDocuments, pageSize} = this.props;
    paginateDocuments(page * pageSize);
    this.setState({page});
  };

  pagination(): Array<React.Node> {
    const {documentsTotal, pageSize} = this.props;
    const {page} = this.state;
    const pages = Math.ceil(documentsTotal / pageSize);
    const left =
      page === 0 ? (
        <span key="left" />
      ) : (
        <span
          className="pointer"
          key="left"
          onClick={() => this.paginate(page - 1)}
          onKeyPress={() => this.paginate(page - 1)}
          role="button"
          tabIndex={0}
        >
          &#60;{" "}
        </span>
      );
    const right =
      page < pages - 1 ? (
        <span
          className="pointer"
          key="right"
          onClick={() => this.paginate(page + 1)}
          onKeyPress={() => this.paginate(page + 1)}
          role="button"
          tabIndex={0}
        >
          {" "}
          &#62;
        </span>
      ) : (
        <span key="right" />
      );
    return [left]
      .concat(
        [...Array(pages).keys()].map(
          (x) =>
            x === page ? (
              <span key={x} className="b">
                {x + 1}{" "}
              </span>
            ) : (
              <span
                className="pointer"
                key={x}
                onClick={() => this.paginate(x)}
                onKeyPress={() => this.paginate(x)}
                role="button"
                tabIndex={0}
              >
                {x + 1}{" "}
              </span>
            ),
        ),
      )
      .concat(right);
  }

  render() {
    const {documents} = this.props;
    return documents.length > 0 ? (
      <table className="collapse w-100">
        <thead>
          <tr>
            <td className="pv2 ph3 tc fw6 ttu ba">Document</td>
            <td className="pv2 ph3 tc fw6 ttu ba">Companies</td>
            <td className="pv2 ph3 tc fw6 ttu ba">Systems</td>
            <td className="pv2 ph3 tc fw6 ttu ba">Source</td>
          </tr>
        </thead>
        <tbody>
          {documents.map(({id, title, source, companies, systems}) => (
            <DocumentsTableRow
              key={id}
              id={id}
              title={title}
              source={source}
              companies={companies}
              systems={systems}
            />
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td className="pv2 ph3 tc ba" colSpan={4}>
              {this.pagination()}
            </td>
          </tr>
        </tfoot>
      </table>
    ) : (
      ""
    );
  }
}

export default DocumentsTable;
