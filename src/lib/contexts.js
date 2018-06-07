// @flow
import * as React from "react";
import SearchStore from "../stores/search";

export const SearchContext = React.createContext({store: new SearchStore()});
