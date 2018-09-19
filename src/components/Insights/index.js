// @flow
import * as React from "react";

import Header from "../Header";
import Footer from "../Footer";
import InsightsNav from "../InsightsNav";
import InsightsCompaniesSystems from "../InsightsCompaniesSystems";
import InsightsAuthorities from "../InsightsAuthorities";
import InsightsDepartments from "../InsightsDepartments";
import Context from "../../lib/context";
import "./index.css";

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
        <div className="w-100 w-100-m w-50-ns pa4 ml5-ns">
          <h2 className="f-subheadline-ns f2 lh-solid primary-color ttu bl b--accentuated-color bw3 pl2 ">
            Data Insightss
          </h2>
          <p className="f4 i mid-gray">
          Exploratory overview
          </p>
          <p className="f4 near-black">
          The data presented here is partial to the category selected, it gives a visual hint so it is easy to navigate.
          </p>


        </div>
        <div className="w-50-ns dn dn-m dt-ns">
          <img className="w-50 pl7" alt="" src="/images/insight.png" />
        </div>
      </article>
      <InsightsNav activeInsight={activeInsight} />
      <Context.Consumer>
        {({store}) => <InsightComponent store={store} />}
      </Context.Consumer>
      <Footer />
    </div>
  );
};

export default Insights;
