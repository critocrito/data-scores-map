// @flow
import * as React from "react";
import marked from "marked";

import "./index.css";
import Header from "../Header";

// $FlowFixMe
import text from "../../../markdown/kent.md";

const CaseStudies = () => (
  <div>
    <Header />
    <div className="w-70" dangerouslySetInnerHTML={{__html: marked(text)}} />
  </div>
);

export default CaseStudies;
