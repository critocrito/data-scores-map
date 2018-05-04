// @flow
import * as React from "react";

import SidePanel from "../SidePanel";
import MapContainer from "../MapContainer";
import type {City} from "../../lib/types";

type State = {
  citiesCount: number,
  cities: Array<City>,
};

class DataNav extends React.Component<{}, State> {
  state = {
    citiesCount: 0,
    cities: [],
  };

  async componentDidMount() {
    const result = await fetch("http://localhost:4000/cities").then(resp =>
      resp.json(),
    );
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      cities: result.data.map(c =>
        Object.assign(c, {
          position: [c.lat, c.lng],
        }),
      ),
      citiesCount: result.length,
    });
  }

  render() {
    const {citiesCount, cities} = this.state;
    return (
      <article className="flex">
        <div className="w-third">
          <SidePanel />
        </div>
        <div className="w-two-thirds">
          <MapContainer count={citiesCount} cities={cities} />
        </div>
      </article>
    );
  }
}

export default DataNav;
