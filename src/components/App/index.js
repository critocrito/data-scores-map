// @flow
import * as React from "react";

import "./index.css";
import type Store from "../../lib/store";
import DataNav from "../DataNav";

type Props = {
  store: Store,
};

const App = ({store}: Props) => (
  <div className="App">
    <DataNav store={store} />
  </div>
);

export default App;
