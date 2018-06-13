// @flow
/* eslint react/display-name: off */
import * as React from "react";
import {Link} from "react-router-dom";

import "./index.css";
import type SearchStore from "../../stores/search";

type Props = {
  id: string,
  title: string,
  highlights: {
    href_text?: string[],
    title?: string[],
    description?: string[],
  },
  store: SearchStore,
};

const SearchResultsItem = (props: Props) => {
  const {id, title, highlights, store} = props;
  const row = type => (h, i) => (
    <div key={i} className="flex">
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
    <div className="pa0 ma0 block pointer">
      <Link
        className="link black .bodoni"
        to={{pathname: `/${id}`}}
        onClick={() => store.setResults([])}
      >
        <div className="f6 fw7 lh-copy white bg-dark-gray ttu tracked ma0 pa1">
          {title}
        </div>
        <div className="bg-white mb2 suggestion-row">
          {titleHighlights}
          {descriptionHighlights}
          {textHighlights}
        </div>
      </Link>
    </div>
  );
};

export default SearchResultsItem;
