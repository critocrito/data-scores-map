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
          &#60; Previous&nbsp;&nbsp;&nbsp;&nbsp;
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
          &nbsp;&nbsp;&nbsp;&nbsp;Next &#62;
        </span>
      ) : (
        <span key="right" />
      );
    return [left, right];
  }

  render() {
    const {documents, documentsTotal} = this.props;
    return documents.length > 0 ? (
      <table className="collapse w-100">
        <thead>
          <tr>
            <td className="pv2 ph3 tc fw6 ttu bb">
              Document ({documentsTotal})
            </td>
            <td className="pv2 ph3 tc fw6 ttu bb">Authorities</td>
            <td className="pv2 ph3 tc fw6 ttu bb">Companies</td>
            <td className="pv2 ph3 tc fw6 ttu bb">Systems</td>
            <td className="pv2 ph3 tc fw6 ttu bb">Source</td>
          </tr>
        </thead>
        <tbody>
          {documents.map(
            ({id, title, authorities, source, companies, systems}) => (
              <DocumentsTableRow
                key={id}
                id={id}
                title={title}
                authorities={authorities}
                source={source}
                companies={companies}
                systems={systems}
              />
            ),
          )}
        </tbody>

        <tfoot>
          <tr>
            <td className="pv2 ph3 tc" colSpan={5}>
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
