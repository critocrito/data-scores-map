// @flow
import * as React from "react";
import {toJS} from "mobx";
import {observer} from "mobx-react";
import {Map, ZoomControl, TileLayer} from "react-leaflet";

import "./index.css";
import MapMarker from "../MapMarker";
import {DocumentContext} from "../../lib/contexts";
import type Store from "../../lib/store";
import type {Position} from "../../lib/types";

type Props = {
  position: Position,
  zoom: number,
  store: Store,
};

const MapContainer = observer(({store, position, zoom}: Props) => {
  const markers = toJS(store.activeCouncils).map(council => {
    const {unitsByKeywords} = council;
    const countByKeywords = Object.keys(unitsByKeywords)
      .filter(
        key =>
          store.selectedKeywords.length === 0 ||
          store.selectedKeywords.includes(key),
      )
      .reduce(
        (memo, key) =>
          Object.assign(memo, {[key]: unitsByKeywords[key].length}),
        {},
      );
    return (
      <DocumentContext.Consumer key={council.id}>
        {({store: documentStore}) => (
          <MapMarker
            key={council.id}
            council={toJS(council)}
            countByKeywords={countByKeywords}
            documentStore={documentStore}
          />
        )}
      </DocumentContext.Consumer>
    );
  });

  return (
    <article>
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
        <div>{markers}</div>
        <ZoomControl position="bottomright" />
      </Map>
    </article>
  );
});

MapContainer.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  position: [54.559322587438636, -4.262695312500001],
  // eslint-disable-next-line react/default-props-match-prop-types
  zoom: 6,
};

export default MapContainer;
