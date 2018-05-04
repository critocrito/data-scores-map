// @flow
import React from "react";
import "./index.css";
import DataNav from "../DataNav";
import DataView from "../DataView";
import type {City} from "../../lib/types";

type Props = {
  cities: Array<City>,
};

const App = ({cities}: Props) => (
  <div className="App">
    <DataNav citiesAll={cities} />
    <article>
      <DataView />
    </article>
  </div>
);

// FIXME: See https://github.com/yannickcr/eslint-plugin-react/issues/1593
App.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  cities: [],
};

export default App;
