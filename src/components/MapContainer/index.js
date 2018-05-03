// @flow
import * as React from "react";
// $FlowFixMe
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import "./index.css";

type State = {
  lat: number,
  lng: number,
  zoom: number,
};

class MapContainer extends React.Component<{}, State> {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <article>
        <Map id="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
        </Map>
      </article>
    );
  }
}

export default MapContainer;
