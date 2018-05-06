// @flow
import * as React from "react";

import "./index.css";
import DataNav from "../DataNav";
import type {Document, City} from "../../lib/types";

type Props = {
  cities: Array<City>,
  documents: Array<Document>,
};

const App = ({documents, cities}: Props) => (
  <div className="App">
    <DataNav documentsAll={documents} citiesAll={cities} />
  </div>
);

// FIXME: See https://github.com/yannickcr/eslint-plugin-react/issues/1593
App.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  cities: [],
  // eslint-disable-next-line react/default-props-match-prop-types
  documents: [],
};

export default App;
