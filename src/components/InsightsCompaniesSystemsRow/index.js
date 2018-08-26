// @flow
import * as React from "react";

type Props = {
  name: string,
  systems: Array<{name: string, id: string, count: number}>,
};

const InsightsCompaniesSystemsRow = ({name, systems}: Props) => (
  <tr className="bb">
    <td className="pa2 v-top bb nowrap">{name}</td>
    <td className="pa2 v-top bb">
      {systems.map(({id, name: systemName}) => (
        <p key={id} className="pa0 ma0 nowrap">
          {systemName}
        </p>
      ))}
    </td>
  </tr>
);

export default InsightsCompaniesSystemsRow;
