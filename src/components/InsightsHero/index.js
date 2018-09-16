// @flow
import * as React from "react";

import "./index.css";

const InsightsHero = () => (
  <article className="cf ph2-ns flex bg-gradient">
    <div className="w-100 w-60-ns pa2">
      <h2 className="f-subheadline-ns f2 lh-solid bl5 primary-color ttu bl b--accentuated-color bw4 pl2 ml5-ns">
        Data Insights
      </h2>
      <p className="f3 pl4-ns">
        This database was collected using relevant terms or{" "}
        <span className="primary-color">keywords</span> that referred to
        different algorithms. We scrape the documents from different sources
        using search results.
      </p>
      <p className="pl4-ns">
        The database contains a total of 2000 indexed documents. That responds
        to an inclusion of at least one of the{" "}
        <span className="primary-color">keywords</span>. On top of this we
        narrow this number with a layer of name of{" "}
        <span className="primary-color">companies</span> and{" "}
        <span className="primary-color">systems</span>. This drops a xx amount
        of documents where at least a company name is mentioned or a system.
        Based on the URL on the source and the content itself we use an human
        verification method to filter the documents based on social apsects.
        This drops an xxx amount of documents. We also search for local
        authorities names, in order to locate this information on the map. This
        drops a xx amount of documents.
      </p>
    </div>
    <div className="w-40-ns dt-ns dn pa2">
      <p>Logo</p>
    </div>
  </article>
);

export default InsightsHero;
