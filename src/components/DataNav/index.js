// @flow
import * as React from "react";

import "./index.css";
import SidePanel from "../SidePanel";
import MapContainer from "../MapContainer";
import type {City} from "../../lib/types";

type State = {
  cities: Array<City>,
  citiesAll: Array<City>,
  citiesCount: number,
  selectedKeywords: Array<string>,
};

class DataNav extends React.Component<{}, State> {
  state = {
    citiesCount: 0,
    cities: [],
    citiesAll: [],
    selectedKeywords: [],
  };

  async componentDidMount() {
    const result = await fetch("http://localhost:4000/cities").then(resp =>
      resp.json(),
    );
    const cities = result.data.map(c =>
      Object.assign(c, {
        position: [c.lat, c.lng],
      }),
    );
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      cities,
      citiesAll: cities,
      citiesCount: cities.length,
    });
  }

  isSelectedKeyword(keyword: string): boolean {
    return this.state.selectedKeywords.includes(keyword);
  }

  toggleSelectedKeyword(keyword: string) {
    const {selectedKeywords, citiesAll} = this.state;
    const newSelected = this.isSelectedKeyword(keyword)
      ? selectedKeywords.filter(k => k !== keyword)
      : selectedKeywords.concat(keyword);
    const cities =
      newSelected.length > 0
        ? citiesAll.filter(city =>
            city.keywords.reduce((memo, key) => {
              if (memo) return memo;
              return newSelected.includes(key);
            }, false),
          )
        : citiesAll;
    this.setState({
      selectedKeywords: newSelected,
      citiesCount: cities.length,
      cities,
    });
  }

  render() {
    const {citiesCount, cities, citiesAll, selectedKeywords} = this.state;
    return (
      <article className="flex">
        <div className="sp-wrapper w-third">
          <SidePanel
            isSelectedKeyword={k => this.isSelectedKeyword(k)}
            selectKeywordHandler={k => this.toggleSelectedKeyword(k)}
            cities={cities}
            citiesAll={citiesAll}
          />
        </div>
        <div className="w-two-thirds">
          <MapContainer
            count={citiesCount}
            cities={cities}
            selectedKeywords={selectedKeywords}
          />
        </div>
      </article>
    );
  }
}

export default DataNav;
