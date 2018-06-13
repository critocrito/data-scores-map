// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {HorizontalBar} from "react-chartjs-2";
import classnames from "classnames";

import "./index.css";
import type Store from "../../lib/store";
import type {Council} from "../../lib/types";

type Props = {
  store: Store,
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

const rowItem = (
  key: string,
  classNames: string,
  clickHandler: () => void,
  chartData: {[string]: any},
  content: React.Node,
) => (
  <li key={key} className={classNames}>
    <button
      className="link pa0 ma0 w-100"
      onClick={clickHandler}
      onKeyPress={clickHandler}
    >
      <div className="flex pa1 items-center">
        <div className="w-50 tl f6">{content}</div>
        <div className="sp-chart w-40">
          <HorizontalBar data={chartData} options={chartOptions} />
        </div>
      </div>
    </button>
  </li>
);

@observer
class SidePanel extends React.Component<Props> {
  keywordsList(councils: Council[]) {
    const {store} = this.props;

    const keywordStats = councils.reduce(
      (memo, {keywords, unitsByKeywords}) => {
        keywords.forEach(key => {
          const unitsCount = key in memo ? memo[key].unitsCount : 0;
          const councilsCount = key in memo ? memo[key].councilsCount : 0;
          const newUnitsCount =
            key in unitsByKeywords ? unitsByKeywords[key].length : 0;

          Object.assign(memo, {
            [key]: {
              unitsCount: unitsCount + newUnitsCount,
              councilsCount: councilsCount + 1,
            },
          });
        });

        return memo;
      },
      {},
    );
    return Object.keys(keywordStats)
      .sort((a, b) => a.localeCompare(b))
      .map(k => {
        const {unitsCount, councilsCount} = keywordStats[k];

        const chartData = {
          labels: ["units", "councils"],
          datasets: [
            {
              backgroundColor: [color, colorAlt],
              borderWidth: 0,
              hoverBackgroundColor: [color, colorAlt],
              data: [unitsCount, councilsCount],
            },
          ],
        };
        const classNames = classnames({
          "sp-row": true,
          "w-100": true,
          "sp-row--active": store.isSelectedKeyword(k),
        });
        const clickHandler = () => store.toggleKeyword(k);
        const content = <div className="b tty">{k}</div>;
        return rowItem(k, classNames, clickHandler, chartData, content);
      });
  }

  councilsList(councils: Council[]) {
    const {store} = this.props;
    const councilStats = councils.reduce((memo, council) => {
      const unitsCount = Object.keys(council.unitsByKeywords).reduce(
        (acc, key) => acc + council.unitsByKeywords[key].length,
        0,
      );

      Object.assign(memo, {
        [council.id]: {
          council,
          unitsCount,
          keywordsCount: council.keywords.length,
        },
      });

      return memo;
    }, {});

    return Object.keys(councilStats)
      .sort((a, b) => a.localeCompare(b))
      .map(id => {
        const {council, unitsCount, keywordsCount} = councilStats[id];

        const chartData = {
          labels: ["units", "keywords"],
          datasets: [
            {
              backgroundColor: [color, colorAlt],
              borderWidth: 0,
              hoverBackgroundColor: [color, colorAlt],
              data: [unitsCount, keywordsCount],
            },
          ],
        };
        const classNames = classnames({
          "sp-row": true,
          "w-100": true,
          "sp-row--active": store.isSelectedCouncil(id),
        });
        const clickHandler = () => store.toggleCouncil(id);
        const content = (
          <div>
            <span className="b ttu">{council.name}</span>
          </div>
        );
        return rowItem(id, classNames, clickHandler, chartData, content);
      });
  }

  render() {
    const {store} = this.props;

    const children =
      store.activeView === "keywords"
        ? this.keywordsList(store.councils)
        : this.councilsList(store.councils);

    const className = "ttu dib link pa3 black bg-white bn";
    const activeClassName = `${className} b--blue b bb bw2`;
    return (
      <article className="bg-white ma0 br2">
        <section className="f6 bb bw1 b--black-10 flex">
          <button
            className={
              store.activeView === "councils" ? className : activeClassName
            }
            onClick={() => store.toggleView()}
            onKeyPress={() => store.toggleView()}
          >
            Categories
          </button>
          <button
            className={
              store.activeView === "councils" ? activeClassName : className
            }
            onClick={() => store.toggleView()}
            onKeyPress={() => store.toggleView()}
          >
            Councils
          </button>
          <span className="flex">
            <button
              className="ttu dib link light-blue pa3 bg-white bn"
              onClick={() => store.reset()}
              onKeyPress={() => store.reset()}
            >
              Reset
            </button>
          </span>
        </section>
        <section className="flex pa0 ma0 w-100">
          <ul className="list pa0 ma0 w-100">{children}</ul>
        </section>
      </article>
    );
  }
}

export default SidePanel;
