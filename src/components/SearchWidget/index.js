// @flow
import * as React from "react";

type Props = {
  style: {[string]: mixed},
  searchTerm: string,
  searchCount: number,
};

const SearchWidget = ({style, searchTerm, searchCount}: Props) => (
  <p style={style} className="pointer bg-white ba pa3">
    Search for: {searchTerm} ({searchCount})
  </p>
);

export default SearchWidget;
