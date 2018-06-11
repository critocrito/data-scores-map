// @flow
import * as React from "react";
import SearchStore from "../stores/search";
import DocumentStore from "../stores/document";

export const SearchContext = React.createContext({store: new SearchStore()});
export const DocumentContext = React.createContext({
  store: new DocumentStore(),
});
