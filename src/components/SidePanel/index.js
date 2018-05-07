// @flow
import * as React from "react";
// $FlowFixMe
import {toJS} from "mobx";
import {observer} from "mobx-react";
// $FlowFixMe
import {HorizontalBar} from "react-chartjs-2";
import classnames from "classnames";

import "./index.css";
import type Store from "../../lib/store";

type Props = {
  store: Store,
  activeList: string,
  toggleList: void => void,
  toggleEntity: void => void,
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

@observer
class SidePanel extends React.Component<Props> {
  keywordsList() {
    const keywordStats = toJS(this.props.store.entitiesAll).reduce(
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
          "sp-row--active": this.props.store.isSelectedKeyword(k),
        });
        const clickHandler = () => this.props.store.toggleKeyword(k);
        const content = <div className="b tty">{k}</div>;
        return rowItem(k, classNames, clickHandler, chartData, content);
      });
  }

  citiesList() {
    const cityStats = toJS(this.props.store.entitiesAll).reduce(
      (memo, city) => {
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
      },
      {},
    );

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
          "sp-row--active": this.props.store.isSelectedCity(id),
        });
        const clickHandler = () => this.props.store.toggleCity(id);
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

  councilsList() {
    const councilStats = toJS(this.props.store.entitiesAll).reduce(
      (memo, council) => {
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
      },
      {},
    );

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
          "sp-row--active": this.props.store.isSelectedCouncil(id),
        });
        const clickHandler = () => this.props.store.toggleCouncil(id);
        const content = (
          <div>
            <span className="b ttu">{council.name}</span>
          </div>
        );
        return rowItem(id, classNames, clickHandler, chartData, content);
      });
  }

  render() {
    const {store, activeList, toggleList, toggleEntity, resetList} = this.props;
    const toggleListHandler = () => toggleList();
    const toggleEntityHandler = () => toggleEntity();
    const resetHandler = () => resetList();
    const entities = store.isCitiesEntity()
      ? this.citiesList()
      : this.councilsList();
    const children = activeList === "keywords" ? this.keywordsList() : entities;
    const keywordsToggle =
      activeList === "keywords" ? (
        <button onClick={resetHandler} onKeyPress={resetHandler}>
          Reset Keywords
        </button>
      ) : (
        <button onClick={toggleListHandler} onKeyPress={toggleListHandler}>
          Select Keywords
        </button>
      );
    const entitiesToggle =
      activeList === "entities" ? (
        <button onClick={resetHandler} onKeyPress={resetHandler}>
          Reset {store.isCitiesEntity() ? "Cities" : "Councils"}
        </button>
      ) : (
        <button onClick={toggleListHandler} onKeyPress={toggleListHandler}>
          Select {store.isCitiesEntity() ? "Cities" : "Councils"}
        </button>
      );

    const entityToggle = (
      <button onClick={toggleEntityHandler} onKeyPress={toggleEntityHandler}>
        Map {store.isCitiesEntity() ? "Councils" : "Cities"}
      </button>
    );

    return (
      <article className="sp pa0 ma0">
        <section className="sp-header flex pa0 ma0">
          <div className="w-33">{keywordsToggle}</div>
          <div className="w-33">{entitiesToggle}</div>
          <div className="w-33">{entityToggle}</div>
        </section>
        <section className="flex pa0 ma0 w-100">
          <ul className="list pa0 ma0 w-100">{children}</ul>
        </section>
      </article>
    );
  }
}

export default SidePanel;
