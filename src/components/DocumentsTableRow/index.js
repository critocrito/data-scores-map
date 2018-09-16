// @flow
import * as React from "react";
import {Link} from "react-router-dom";

import "./index.css";
import {sourcify} from "../../lib/utils";

type Props = {
  id: string,
  title: string,
  authorities: string[],
  departments: string[],
  source: string,
  companies: string[],
  systems: string[],
};

const DocumentsTableRow = ({
  id,
  title,
  authorities,
  departments,
  source,
  companies,
  systems,
}: Props) => (
  <tr className="bb">
    <td>
      <Link to={`/${id}`} className="f6 link black pt3 pb3">
        {title}
      </Link>
    </td>
    <td className="tc">
      <Link to={`/${id}`} className="f6 link black">
        {authorities.length === 0 ? "—" : authorities.join(", ")}
      </Link>
    </td>
    <td className="tc">
      <Link to={`/${id}`} className="f6 link black">
        {departments.length === 0 ? "—" : departments.join(", ")}
      </Link>
    </td>
    <td className="tc">
      <Link to={`/${id}`} className="f6 link black">
        {companies.length === 0 ? "—" : companies.join(", ")}
      </Link>
    </td>
    <td className="tc">
      <Link to={`/${id}`} className="f6 link black">
        {systems.length === 0 ? "—" : systems.join(", ")}
      </Link>
    </td>

    <td className="tc">
      <Link to={`/${id}`} className="f6 link black">
        {sourcify(source)}
      </Link>
    </td>
  </tr>
);

export default DocumentsTableRow;
