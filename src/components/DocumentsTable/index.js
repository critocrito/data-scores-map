// @flow
import * as React from "react";

import DocumentsTableRow from "../DocumentsTableRow";
import pageableList from "../pageableList";
import type {Document} from "../../lib/types";
import "./index.css";

type Props = {
  documents: Document[],
  total: number,
  pagination: React.Node[],
};

const DocumentsTable = ({documents, total, pagination}: Props) =>
  documents.length > 0 ? (
    <table className="collapse w-90 center mt5 f5">
      <thead>
        <tr>
          <td className="pv2 ph3 tc fw6 ttu bb">Document ({total})</td>
          <td className="pv2 ph3 tc fw6 ttu bb">Authorities</td>
          <td className="pv2 ph3 tc fw6 ttu bb">Departments</td>
          <td className="pv2 ph3 tc fw6 ttu bb">Companies</td>
          <td className="pv2 ph3 tc fw6 ttu bb">Systems</td>
          <td className="pv2 ph3 tc fw6 ttu bb">Source</td>
        </tr>
      </thead>
      <tbody>
        {documents.map(
          ({
            id,
            title,
            authorities,
            departments,
            source,
            companies,
            systems,
          }) => (
            <DocumentsTableRow
              key={id}
              id={id}
              title={title}
              authorities={authorities}
              departments={departments}
              source={source}
              companies={companies}
              systems={systems}
            />
          ),
        )}
      </tbody>

      <tfoot>
        <tr>
          <td className="pv2 ph3 tc" colSpan={6}>
            {pagination}
          </td>
        </tr>
      </tfoot>
    </table>
  ) : (
    ""
  );

export default pageableList(DocumentsTable);
