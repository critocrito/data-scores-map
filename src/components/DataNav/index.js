// @flow
import * as React from "react";

import "./index.css";
import SidePanel from "../SidePanel";
import MapContainer from "../MapContainer";
import type {City} from "../../lib/types";

type Props = {
  citiesAll: Array<City>,
};

type State = {
  cities: Array<City>,
  citiesCount: number,
  selectedKeywords: Array<string>,
  selectedCities: Array<string>,
  list: string,
};

class DataNav extends React.Component<Props, State> {
  static defaultProps = {
    citiesAll: [],
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      cities: props.citiesAll,
      citiesCount: props.citiesAll.length,
      selectedKeywords: [],
      selectedCities: [],
      list: "keywords",
    };
  }

  isSelectedCity(id: string): boolean {
    return this.state.selectedCities.includes(id);
  }

  isSelectedKeyword(keyword: string): boolean {
    return this.state.selectedKeywords.includes(keyword);
  }

  toggleSelectedCity(id: string) {
    const {citiesAll} = this.props;
    const {selectedCities} = this.state;
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
    const {citiesAll} = this.props;
    const {selectedKeywords} = this.state;
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
    const {citiesAll} = this.props;
    const {list} = this.state;
    const newList = list === "keywords" ? "cities" : "keywords";
    this.setState({
      cities: citiesAll,
      list: newList,
      selectedKeywords: [],
      selectedCities: [],
    });
  }

  resetList() {
    const {citiesAll} = this.props;
    this.setState({
      cities: citiesAll,
      selectedKeywords: [],
      selectedCities: [],
    });
  }

  render() {
    const {citiesAll} = this.props;
    const {citiesCount, cities, list, selectedKeywords} = this.state;
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
