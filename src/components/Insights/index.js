// @flow
import * as React from "react";

import Header from "../Header";
import InsightsHero from "../InsightsHero";
import InsightsNav from "../InsightsNav";
import InsightsCategories from "../InsightsCategories";
import InsightsCompaniesSystems from "../InsightsCompaniesSystems";
import InsightsAuthorities from "../InsightsAuthorities";
import Context from "../../lib/context";

type State = {
  activeInsight: string,
};

class Insights extends React.Component<{}, State> {
  state = {
    activeInsight: "categories",
  };

  switchInsights = (targetInsight: string) => {
    const {activeInsight} = this.state;
    if (activeInsight !== targetInsight)
      this.setState({
        activeInsight: targetInsight,
      });
  };

  render() {
    const {activeInsight} = this.state;
    let InsightComponent;

    switch (activeInsight) {
      case "companies-systems":
        InsightComponent = InsightsCompaniesSystems;
        break;
      case "authorities":
        InsightComponent = InsightsAuthorities;
        break;
      default:
        InsightComponent = InsightsCategories;
    }

    return (
      <div>
        <Header />
        <InsightsHero />
        <div className="cf mt3 mb3 ph2-ns">
          <h2 className="fl f2 pa2 ttu white bg-primary-color">
            Explore The Data
          </h2>
        </div>
        <InsightsNav
          activeInsight={activeInsight}
          selectInsight={this.switchInsights}
        />
        <Context.Consumer>
          {({store}) => <InsightComponent store={store} />}
        </Context.Consumer>
      </div>
    );
  }
}

export default Insights;
