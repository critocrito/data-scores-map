// @flow
import * as React from "react";
// $FlowFixMe
import {Map, ZoomControl, TileLayer} from "react-leaflet";

import "./index.css";
import MapMarker from "../MapMarker";
import type {City, Position} from "../../lib/types";

type Props = {
  position: Position,
  zoom: number,
  count: number,
  cities: Array<City>,
  selected: Array<string>,
};

const MapContainer = ({position, zoom, cities, count, selected}: Props) => {
  const markers = cities.map(c => (
    <MapMarker key={c.id} entity={c} selected={selected} />
  ));

  return (
    <article>
      <Map id="map" center={position} zoom={zoom} zoomControl={false}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <div>{markers}</div>
        <ZoomControl position="bottomright" />
      </Map>
      <p>{count} Cities</p>
    </article>
  );
};

// FIXME: See https://github.com/yannickcr/eslint-plugin-react/issues/1593
MapContainer.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  selected: [],
  // eslint-disable-next-line react/default-props-match-prop-types
  position: [54.00366, -2.547855],
  // eslint-disable-next-line react/default-props-match-prop-types
  zoom: 6,
};

export default MapContainer;
