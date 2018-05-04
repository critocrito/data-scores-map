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
  activeList: string,
  isSelectedKeyword: string => boolean,
  isSelectedCity: string => boolean,
  selectKeywordHandler: string => void,
  selectCityHandler: string => void,
  toggleList: void => void,
  resetList: void => void,
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
        <div className="w-50 tl">{content}</div>
        <div className="sp-chart w-40">
          <HorizontalBar data={chartData} options={chartOptions} />
        </div>
      </div>
    </button>
  </li>
);

class SidePanel extends React.Component<Props> {
  static defaultProps = {
    citiesAll: [],
  };

  keywordsList() {
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
    return Object.keys(keywordStats)
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
          "sp-row--active": this.props.isSelectedKeyword(k),
        });
        const clickHandler = () => this.props.selectKeywordHandler(k);
        const content = <div className="b tty">{k}</div>;
        return rowItem(k, classNames, clickHandler, chartData, content);
      });
  }

  citiesList() {
    const cityStats = this.props.citiesAll.reduce((memo, city) => {
      const unitsCount = Object.keys(city.unitsByKeywords).reduce(
        (acc, key) => acc + city.unitsByKeywords[key].length,
        0,
      );

      Object.assign(memo, {
        [city.id]: {
          city,
          unitsCount,
          keywordsCount: city.keywords.length,
        },
      });

      return memo;
    }, {});

    return Object.keys(cityStats)
      .sort((a, b) => a.localeCompare(b))
      .map(id => {
        const {city, unitsCount, keywordsCount} = cityStats[id];

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
          "sp-row--active": this.props.isSelectedCity(id),
        });
        const clickHandler = () => this.props.selectCityHandler(id);
        const content = (
          <div>
            <span className="b ttu">{city.name}</span>
            <br />
            <span className="f7 i">{city.county}</span>
          </div>
        );
        return rowItem(id, classNames, clickHandler, chartData, content);
      });
  }

  render() {
    const {activeList, toggleList, resetList} = this.props;
    const toggleHandler = () => toggleList();
    const resetHandler = () => resetList();
    const children =
      activeList === "keywords" ? this.keywordsList() : this.citiesList();
    const keywordsToggle =
      activeList === "keywords" ? (
        <button onClick={resetHandler} onKeyPress={resetHandler}>
          Reset Keywords
        </button>
      ) : (
        <button onClick={toggleHandler} onKeyPress={toggleHandler}>
          Select Keywords
        </button>
      );
    const citiesToggle =
      activeList === "cities" ? (
        <button onClick={resetHandler} onKeyPress={resetHandler}>
          Reset Cities
        </button>
      ) : (
        <button onClick={toggleHandler} onKeyPress={toggleHandler}>
          Select Cities
        </button>
      );

    return (
      <article className="sp pa0 ma0">
        <section className="sp-header flex pa0 ma0">
          <div className="w-50">{keywordsToggle}</div>
          <div className="w-50">{citiesToggle}</div>
        </section>
        <section className="flex pa0 ma0 w-100">
          <ul className="list pa0 ma0 w-100">{children}</ul>
        </section>
      </article>
    );
  }
}

export default SidePanel;
