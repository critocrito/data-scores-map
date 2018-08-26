// @flow
import * as React from "react";
import {Link} from "react-router-dom";

import "./index.css";
import {sourcify} from "../../lib/utils";

type Props = {
  id: string,
  title: string,
  source: string,
  companies: string[],
  systems: string[],
};

const DocumentsTableRow = ({id, title, source, companies, systems}: Props) => (
    <tr>
      <td className="pv2 ph3 tl bl">
        <Link to={`/${id}`} className="link primary-color">
          {title}
        </Link>
      </td>
      <td className="pv2 ph3 tc bl br">
        <Link to={`/${id}`} className="link primary-color">
          {companies.length === 0 ? "—" : companies.join(", ")}
        </Link>
      </td>
      <td className="pv2 ph3 tc bl br">
        <Link to={`/${id}`} className="link primary-color">
          {systems.length === 0 ? "—" : systems.join(", ")}
        </Link>
      </td>
      <td className="pv2 ph3 tc br">
        <Link to={`/${id}`} className="link primary-color">
          {sourcify(source)}
        </Link>
      </td>
    </tr>
  );

export default DocumentsTableRow;
