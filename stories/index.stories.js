// @flow
import React from "react";
import {storiesOf} from "@storybook/react";

import SearchBar from "../src/components/SearchBar";
import SearchResults from "../src/components/SearchResults";
import {SearchContext} from "../src/lib/contexts";

storiesOf("SearchBar", module).add("humble", () => (
  <div>
    <SearchContext.Consumer>
      {({store: searchStore}) => <SearchBar store={searchStore} />}
    </SearchContext.Consumer>
    <SearchContext.Consumer>
      {({store: searchStore}) => <SearchResults store={searchStore} />}
    </SearchContext.Consumer>
  </div>
));
