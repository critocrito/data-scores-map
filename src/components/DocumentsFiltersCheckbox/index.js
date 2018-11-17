// @flow
import * as React from "react";

type Props = {
  id: string,
  name: string,
  prettyName: string | void,
  checked: boolean,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => mixed,
};

const DocumentsFiltersCheckbox = ({
  id,
  name,
  prettyName,
  checked = false,
  onChange,
}: Props) => (
  <div className="checkbox w-100 w-50-m w-third-ns pl1 pt1 pb1">
    <label className="pa1" htmlFor={id}>
      <input
        className="pa1 mr2"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {prettyName == null ? name : prettyName}
    </label>
  </div>
);

export default DocumentsFiltersCheckbox;
