// @flow
import * as React from "react";

import Header from "../Header";
import InsightsNav from "../InsightsNav";
import InsightsCompaniesSystems from "../InsightsCompaniesSystems";
import InsightsAuthorities from "../InsightsAuthorities";
import InsightsDepartments from "../InsightsDepartments";
import Context from "../../lib/context";

type Props = {
  activeInsight: string,
};

const Insights = ({activeInsight}: Props) => {
  let InsightComponent;

  switch (activeInsight) {
    case "authorities":
      InsightComponent = InsightsAuthorities;
      break;
    case "departments":
      InsightComponent = InsightsDepartments;
      break;
    default:
      InsightComponent = InsightsCompaniesSystems;
  }

  return (
    <div>
      <Header />
      <article className="cf ph2-ns flex items-center bg-gradient">
        <div className="w-100 w-100-m w-60-ns pa2">
          <h2 className="f-subheadline-ns f2 lh-solid primary-color ttu bl b--accentuated-color bw3 pl2 ml5-ns">
            Data Insights
          </h2>
          <p className="f3 pl4-ns">
            As part of our project{" "}
            <span className="primary-color">‘Data Scores as Governance’</span>{" "}
            we have developed a tool to map and investigate the uses of data
            analytics and algorithms in public services in the UK. Little is
            still known about the implementation of data-driven systems and
            algorithmic processes in public services and how citizens are
            increasingly ‘scored’ based on the collection and combination of
            data. This tool is designed to facilitate further research and
            investigation into this topic and to advance public knowledge and
            understanding.
          </p>
          <p className="pl4-ns">
            The tool is made up of a collection of documents from different
            sources that can be searched and mapped according to different
            categories. The database consists of almost 2000 unverified
            documents that have been scraped based on a number of search terms
            relating to data systems in government. This is an incomplete and
            on-going data-set. You can read more in our Methodology section.
          </p>
        </div>
        <div className="w-40-ns dn dn-m dt-ns pa2">
          <img alt="" src="/images/insight.png" />
        </div>
      </article>
      <InsightsNav activeInsight={activeInsight} />
      <Context.Consumer>
        {({store}) => <InsightComponent store={store} />}
      </Context.Consumer>
    </div>
  );
};

export default Insights;
