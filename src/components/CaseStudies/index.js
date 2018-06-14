// @flow
import * as React from "react";
import {observer} from "mobx-react";
import marked from "marked";

import "./index.css";

// $FlowFixMe
import text from "../../../markdown/kent.md";

const CaseStudies = observer(() => (
  <div className="flex pa3 ma3">
    <div className="w-70" dangerouslySetInnerHTML={{__html: marked(text)}} />
  </div>
));

export default CaseStudies;
