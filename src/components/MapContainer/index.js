// @flow
import * as React from "react";
// $FlowFixMe
import {Map, ZoomControl, TileLayer, Marker, Popup} from "react-leaflet";
import "./index.css";

type State = {
  lat: number,
  lng: number,
  zoom: number,
};

class MapContainer extends React.Component<{}, State> {
  state = {
    lat: 54.00366,
    lng: -2.547855,
    zoom: 6,
  };

  render() {
    const position = [this.state.lat, this.state.lng];
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
          <Marker position={position}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
          <ZoomControl position="bottomright" />
        </Map>
      </article>
    );
  }
}

export default MapContainer;
