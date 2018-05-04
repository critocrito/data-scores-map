// @flow
import * as React from "react";
// $FlowFixMe
import {HorizontalBar} from "react-chartjs-2";
// $FlowFixMe
import classnames from "classnames";

import "./index.css";
import type {City} from "../../lib/types";

type Props = {
  citiesAll: Array<City>,
  selectHandler: string => void,
  isSelected: string => boolean,
};

const [color, colorAlt] = ["rgba(0, 108, 183, 0.7)", "rgba(0, 108, 183, 0.4)"];
const chartOptions = {
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
  maintainAspectRatio: false,
  categoryPercentage: 0.7,
};

class SidePanel extends React.Component<Props> {
  static defaultProps = {
    citiesAll: [],
    selectHandler: () => null,
    isSelected: () => false,
  };

  render() {
    const keywordStats = this.props.citiesAll.reduce(
      (memo, {keywords, unitsByKeywords}) => {
        keywords.forEach(key => {
          const unitsCount = key in memo ? memo[key].unitsCount : 0;
          const citiesCount = key in memo ? memo[key].citiesCount : 0;
          const newUnitsCount =
            key in unitsByKeywords ? unitsByKeywords[key].length : 0;

          Object.assign(memo, {
            [key]: {
              unitsCount: unitsCount + newUnitsCount,
              citiesCount: citiesCount + 1,
            },
          });
        });

        return memo;
      },
      {},
    );
    const keywords = Object.keys(keywordStats)
      .sort((a, b) => a.localeCompare(b))
      .map(k => {
        const {unitsCount, citiesCount} = keywordStats[k];

        const chartData = {
          labels: ["units", "cities"],
          datasets: [
            {
              backgroundColor: [color, colorAlt],
              borderWidth: 0,
              hoverBackgroundColor: [color, colorAlt],
              data: [unitsCount, citiesCount],
            },
          ],
        };
        const classNames = classnames({
          "sp-row": true,
          "w-100": true,
          "sp-row--active": this.props.isSelected(k),
        });
        const clickHandler = () => this.props.selectHandler(k);

        return (
          <li key={k} className={classNames}>
            <button
              className="link pa0 ma0 w-100"
              onClick={clickHandler}
              onKeyPress={clickHandler}
            >
              <div className="flex pa1 items-center">
                <div className="b ttu w-30">{k}</div>
                <div className="sp-chart w-40">
                  <HorizontalBar data={chartData} options={chartOptions} />
                </div>
              </div>
            </button>
          </li>
        );
      });

    return (
      <article className="sp pa0 ma0">
        <section className="sp-header flex pa0 ma0">
          <div className="w-50">
            <button>Keywords</button>
          </div>
          <div className="w-50">
            <button>Cities</button>
          </div>
        </section>
        <section className="flex pa0 ma0 w-100">
          <ul className="list pa0 ma0 w-100">{keywords}</ul>
        </section>
      </article>
    );
  }
}

export default SidePanel;
