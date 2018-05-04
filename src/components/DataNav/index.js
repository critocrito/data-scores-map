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
  selected: Array<string>,
};

class DataNav extends React.Component<{}, State> {
  state = {
    citiesCount: 0,
    cities: [],
    citiesAll: [],
    selected: [],
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

  isSelected(keyword: string): boolean {
    return this.state.selected.includes(keyword);
  }

  toggleSelected(keyword: string) {
    const {selected, citiesAll} = this.state;
    const newSelected = this.isSelected(keyword)
      ? selected.filter(k => k !== keyword)
      : selected.concat(keyword);
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
      selected: newSelected,
      citiesCount: cities.length,
      cities,
    });
  }

  render() {
    const {citiesCount, cities, citiesAll, selected} = this.state;
    return (
      <article className="flex">
        <div className="sp-wrapper w-third">
          <SidePanel
            isSelected={k => this.isSelected(k)}
            selectHandler={k => this.toggleSelected(k)}
            cities={cities}
            citiesAll={citiesAll}
          />
        </div>
        <div className="w-two-thirds">
          <MapContainer
            count={citiesCount}
            cities={cities}
            selected={selected}
          />
        </div>
      </article>
    );
  }
}

export default DataNav;
