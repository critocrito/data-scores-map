// @flow
import * as React from "react";

import "./index.css";
import DataNav from "../DataNav";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

const App = ({store}: Props) => (
  <div className="App">
    <DataNav store={store} />
  </div>
);

export default App;
