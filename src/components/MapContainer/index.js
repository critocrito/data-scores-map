// @flow
import * as React from "react";
import {Map, ZoomControl, TileLayer} from "react-leaflet";

import "./index.css";
import MapMarker from "../MapMarker";
import type {City, Position} from "../../lib/types";

type Props = {
  position: Position,
  zoom: number,
  count: number,
  cities: Array<City>,
  selectedKeywords: Array<string>,
};

const MapContainer = ({
  position,
  zoom,
  cities,
  count,
  selectedKeywords,
}: Props) => {
  const markers = cities.map(city => {
    const {unitsByKeywords} = city;
    const countByKeywords = Object.keys(unitsByKeywords)
      .filter(
        key => selectedKeywords.length === 0 || selectedKeywords.includes(key),
      )
      .reduce(
        (memo, key) =>
          Object.assign(memo, {[key]: unitsByKeywords[key].length}),
        {},
      );
    return (
      <MapMarker
        key={city.id}
        entity={city}
        countByKeywords={countByKeywords}
      />
    );
  });

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

MapContainer.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  selectedKeywords: [],
  // eslint-disable-next-line react/default-props-match-prop-types
  position: [54.00366, -2.547855],
  // eslint-disable-next-line react/default-props-match-prop-types
  zoom: 6,
};

export default MapContainer;
