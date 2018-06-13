// @flow
import * as React from "react";

type Props = {
  style: {[string]: mixed},
  searchTerm: string,
};

const SearchWidget = ({style, searchTerm}: Props) => (
  <p style={style} className="pointer bg-white ba pa3">
    Search for {searchTerm}
  </p>
);

export default SearchWidget;
