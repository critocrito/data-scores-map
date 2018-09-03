// @flow
import * as React from "react";
import {Map, ZoomControl, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "./index.css";
import InsightsVizMapMarker from "../InsightsVizMapMarker";
import type {Position, AuthorityInsight} from "../../lib/types";

type Props = {
  authorities: AuthorityInsight[],
  position?: Position,
  zoom?: number,
};

class InsightsVizMap extends React.Component<Props> {
  static defaultProps = {
    position: [54.559322587438636, -4.262695312500001],
    zoom: 6,
  };

  mapMarkers() {
    const {authorities} = this.props;

    return authorities.map(({id, name, count, location}) => (
      <InsightsVizMapMarker
        key={id}
        name={name}
        position={location}
        count={count}
      />
    ));
  }

  render() {
    const {position, zoom} = this.props;
    const markers = this.mapMarkers();

    return (
      <Map
        id="map"
        center={position}
        zoom={zoom}
        minZoom={zoom}
        zoomControl={false}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <MarkerClusterGroup>{markers}</MarkerClusterGroup>
        <ZoomControl position="bottomright" />
      </Map>
    );
  }
}

export default InsightsVizMap;
