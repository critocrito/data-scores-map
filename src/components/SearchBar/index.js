// @flow
import * as React from "react";

import "./index.css";

type Props = {
  name: string,
};

// eslint-disable-next-line react/prefer-stateless-function
class SearchBar extends React.Component<Props> {
  static defaultProps = {
    name: "Progress",
  };

  render() {
    return (
      <form>
        <span className="search_bar">
          <input
            className="search_bar"
            placeholder={`Work in ${this.props.name}`}
            autoComplete="off"
            spellCheck="false"
          />
        </span>
      </form>
    );
  }
}

export default SearchBar;
