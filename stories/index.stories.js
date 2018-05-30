// @flow
import React from "react";
import {storiesOf} from "@storybook/react";

import SearchBar from "../src/components/SearchBar";

storiesOf("SearchBar", module)
  .add("humble", () => <SearchBar />)
  .add("humble with props", () => <SearchBar name="Universe" />);
