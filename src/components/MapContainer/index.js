// @flow
import * as React from "react";
// $FlowFixMe
import {Map, ZoomControl, TileLayer} from "react-leaflet";

import "./index.css";
import MapMarker from "../MapMarker";

type City = {
  id: string,
  lat: number,
  lng: number,
  city: string,
  county: string,
  position: [number, number],
  unitsCount: number,
  units: Array<string>,
  unitsByKeywords: {[keyword: string]: Array<string>},
};

type State = {
  lat: number,
  lng: number,
  zoom: number,
  citiesCount: number,
  cities: Array<City>,
};

class MapContainer extends React.Component<{}, State> {
  state = {
    lat: 54.00366,
    lng: -2.547855,
    zoom: 6,
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
    const position = [this.state.lat, this.state.lng];
    const markers = this.state.cities.map(c => (
      <MapMarker
        key={c.id}
        id={c.id}
        city={c.city}
        county={c.county}
        unitsCount={c.unitsCount}
        position={c.position}
        unitsByKeywords={c.unitsByKeywords}
      />
    ));

    return (
      <article>
        <Map
          id="map"
          center={position}
          zoom={this.state.zoom}
          zoomControl={false}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          />
          <div>{markers}</div>
          <ZoomControl position="bottomright" />
        </Map>
        <p>{this.state.citiesCount} Cities</p>
      </article>
    );
  }
}

export default MapContainer;