// @flow
import * as React from "react";

import "./index.css";
import DataNav from "../DataNav";
import SearchBar from "../SearchBar";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

const App = ({store}: Props) => (
  <div className="App">
    <header className="cf tc w100 flex justify-between items-center">
      <h1>Data Scores in the UK</h1>
      <SearchBar />
    </header>
    <DataNav store={store} />
  </div>
);

export default App;
