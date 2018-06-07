// @flow
/* eslint react/display-name: off */
import * as React from "react";

import "./index.css";

type Props = {
  title: string,
  highlights: {
    href_text?: string[],
    title?: string[],
    description?: string[],
  },
};

const SearchResultsItem = (props: Props) => {
  const {title, highlights} = props;
  const row = type => (h, i) => (
    <div key={i} className="suggestion-row flex">
      <div className="w-20 pa1">{type}</div>
      <div
        className="w-80 pa1 suggestion-highlight"
        dangerouslySetInnerHTML={{__html: h}}
      />
    </div>
  );
  const textHighlights = (highlights.href_text || [])
    .slice(0, 1)
    .map(row("Text"));
  const titleHighlights = (highlights.title || [])
    .slice(0, 1)
    .map(row("Title"));
  const descriptionHighlights = (highlights.description || [])
    .slice(0, 1)
    .map(row("Description"));

  return (
    <div className="suggestion">
      <div className="suggestion-header">{title}</div>
      <div className="suggestion-row-wrapper">
        {titleHighlights}
        {descriptionHighlights}
        {textHighlights}
      </div>
    </div>
  );
};

export default SearchResultsItem;
