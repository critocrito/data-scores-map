// @flow
import * as React from "react";
import {Map, ZoomControl, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "./index.css";
import InsightsVizMapMarker from "../InsightsVizMapMarker";
import type {Position, AuthorityInsight} from "../../lib/types";
import type Store from "../../lib/store";

type Props = {
  authorities: AuthorityInsight[],
  position?: Position,
  zoom?: number,
  fetchDocuments: () => void,
  store: Store,
};

class InsightsVizMap extends React.Component<Props> {
  static defaultProps = {
    position: [54.559322587438636, -4.262695312500001],
    zoom: 6,
  };

  clickMarker = (authority: string) => {
    const {store, fetchDocuments} = this.props;
    const authorities = store.authorityFilters || [];
    store.updateFilters(
      "authorities",
      authorities.find((elem) => elem === authority)
        ? authorities.filter((elem) => elem !== authority)
        : Array.from(new Set(authorities).add(authority)),
    );
    fetchDocuments();
  };

  mapMarkers() {
    const {authorities, store} = this.props;

    return authorities.map(({id, name, count, location}) => {
      const isActive = (store.authorityFilters || []).find(
        (filter) => filter === name,
      );
      return (
        <InsightsVizMapMarker
          key={id}
          name={name}
          position={location}
          count={count}
          isActive={isActive != null}
          clickHandler={this.clickMarker}
        />
      );
    });
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
