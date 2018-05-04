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
  selectedCities: Array<string>,
  list: string,
};

class DataNav extends React.Component<{}, State> {
  state = {
    citiesCount: 0,
    cities: [],
    citiesAll: [],
    selectedKeywords: [],
    selectedCities: [],
    list: "keywords",
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
      citiesAll: cities,
      citiesCount: cities.length,
      cities,
    });
  }

  isSelectedCity(id: string): boolean {
    return this.state.selectedCities.includes(id);
  }

  isSelectedKeyword(keyword: string): boolean {
    return this.state.selectedKeywords.includes(keyword);
  }

  toggleSelectedCity(id: string) {
    const {selectedCities, citiesAll} = this.state;
    const selected = this.isSelectedCity(id)
      ? selectedCities.filter(i => i !== id)
      : selectedCities.concat(id);
    const cities =
      selected.length > 0
        ? citiesAll.filter(city => selected.includes(city.id))
        : citiesAll;
    this.setState({
      selectedCities: selected,
      citiesCount: selected.length,
      cities,
    });
  }

  toggleSelectedKeyword(keyword: string) {
    const {selectedKeywords, citiesAll} = this.state;
    const selected = this.isSelectedKeyword(keyword)
      ? selectedKeywords.filter(k => k !== keyword)
      : selectedKeywords.concat(keyword);
    const cities =
      selected.length > 0
        ? citiesAll.filter(city =>
            city.keywords.reduce((memo, key) => {
              if (memo) return memo;
              return selected.includes(key);
            }, false),
          )
        : citiesAll;
    this.setState({
      selectedKeywords: selected,
      citiesCount: cities.length,
      cities,
    });
  }

  toggleList() {
    const {list, citiesAll} = this.state;
    const newList = list === "keywords" ? "cities" : "keywords";
    this.setState({
      cities: citiesAll,
      list: newList,
      selectedKeywords: [],
      selectedCities: [],
    });
  }

  resetList() {
    const {citiesAll} = this.state;
    this.setState({
      cities: citiesAll,
      selectedKeywords: [],
      selectedCities: [],
    });
  }

  render() {
    const {citiesCount, cities, citiesAll, list, selectedKeywords} = this.state;
    return (
      <article className="flex">
        <div className="sp-wrapper w-third">
          <SidePanel
            isSelectedKeyword={k => this.isSelectedKeyword(k)}
            selectKeywordHandler={k => this.toggleSelectedKeyword(k)}
            isSelectedCity={c => this.isSelectedCity(c)}
            selectCityHandler={c => this.toggleSelectedCity(c)}
            toggleList={() => this.toggleList()}
            resetList={() => this.resetList()}
            activeList={list}
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
