// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {HorizontalBar} from "react-chartjs-2";
import classnames from "classnames";

import "./index.css";
import type Store from "../../lib/store";
import type {Place} from "../../lib/types";

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
  keywordsList(entitiesAll: Place[]) {
    const keywordStats = entitiesAll.reduce(
      (memo, {keywords, unitsByKeywords}) => {
        keywords.forEach(key => {
          const unitsCount = key in memo ? memo[key].unitsCount : 0;
          const entitiesCount = key in memo ? memo[key].entitiesCount : 0;
          const newUnitsCount =
            key in unitsByKeywords ? unitsByKeywords[key].length : 0;

          Object.assign(memo, {
            [key]: {
              unitsCount: unitsCount + newUnitsCount,
              entitiesCount: entitiesCount + 1,
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
        const {unitsCount, entitiesCount} = keywordStats[k];

        const chartData = {
          labels: ["units", "cities"],
          datasets: [
            {
              backgroundColor: [color, colorAlt],
              borderWidth: 0,
              hoverBackgroundColor: [color, colorAlt],
              data: [unitsCount, entitiesCount],
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

  entitiesList(entitiesAll: Place[]) {
    const entityStats = entitiesAll.reduce((memo, entity) => {
      const unitsCount = Object.keys(entity.unitsByKeywords).reduce(
        (acc, key) => acc + entity.unitsByKeywords[key].length,
        0,
      );

      Object.assign(memo, {
        [entity.id]: {
          entity,
          unitsCount,
          keywordsCount: entity.keywords.length,
        },
      });

      return memo;
    }, {});

    return Object.keys(entityStats)
      .sort((a, b) => a.localeCompare(b))
      .map(id => {
        const {entity, unitsCount, keywordsCount} = entityStats[id];

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
          "sp-row--active": this.props.store.isCitiesEntity()
            ? this.props.store.isSelectedCity(id)
            : this.props.store.isSelectedCouncil(id),
        });
        const clickHandler = () =>
          this.props.store.isCitiesEntity()
            ? this.props.store.toggleCity(id)
            : this.props.store.toggleCouncil(id);
        const content =
          entity.type === "city" ? (
            <div>
              <span className="b ttu">{entity.name}</span>
              <br />
              <span className="f7 i">{entity.county}</span>
            </div>
          ) : (
            <div>
              <span className="b ttu">{entity.name}</span>
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

    const entitiesAll =
      store.entity === "cities" ? store.citiesAll : store.councilsAll;
    const children =
      activeList === "keywords"
        ? this.keywordsList(entitiesAll)
        : this.entitiesList(entitiesAll);

    return (
      <article className="sp pa0 ma0">
        <section className="sp-header flex pa0 ma0">
          <div className="w-50 tl">
            <button onClick={resetHandler} onKeyPress={resetHandler}>
              Reset Selection
            </button>{" "}
            <button onClick={toggleListHandler} onKeyPress={toggleListHandler}>
              View by{" "}
              {activeList === "entities"
                ? "Keywords"
                : `${store.isCitiesEntity() ? "Cities" : "Councils"}`}
            </button>
          </div>
          <div className="w-50 tr">
            <button
              onClick={toggleEntityHandler}
              onKeyPress={toggleEntityHandler}
            >
              Map {store.isCitiesEntity() ? "Councils" : "Cities"}
            </button>
          </div>
        </section>
        <section className="flex pa0 ma0 w-100">
          <ul className="list pa0 ma0 w-100">{children}</ul>
        </section>
      </article>
    );
  }
}

export default SidePanel;
