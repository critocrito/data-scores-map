// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Map, ZoomControl, TileLayer, Marker, Tooltip} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import * as L from "leaflet";

import "../InsightsVizMap/index.css";
import "../InsightsVizMapMarker/index.css";
import Header from "../Header";
import Footer from "../Footer";
import {skyNewsImpacts} from "../../lib/requests";
import type {SkyNewsImpact, Position} from "../../lib/types";

type Props = {
  position?: Position,
  zoom?: number,
};

type State = {
  impacts: SkyNewsImpact[],
  activeMarker: null | string,
};

@observer
class SkyNews extends React.Component<Props, State> {
  static defaultProps = {
    position: [54.559322587438636, -4.262695312500001],
    zoom: 6,
  };

  state = {
    impacts: [],
    activeMarker: null,
  };

  _isMounted: boolean = false;

  async componentDidMount() {
    this._isMounted = true;
    try {
      const {data} = await skyNewsImpacts();
      if (this._isMounted) this.setState({impacts: data});
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  clickMarker = (authority: string) => {
    const {activeMarker} = this.state;
    if (authority === activeMarker) {
      this.setState({activeMarker: null});
    } else {
      this.setState({activeMarker: authority});
    }
  };

  details = () => {
    const {impacts, activeMarker} = this.state;
    if (activeMarker == null) return <div />;
    const entry = impacts.find(
      ({name: authorityName}) => authorityName === activeMarker,
    );
    if (entry == null) return <div />;
    const {name, link, systems} = entry;
    return (
      <div>
        <p>
          <b>{name}</b>
          <br />
          <a
            className="link primary-color"
            target="_blank"
            rel="noopener noreferrer"
            href={link}
          >
            {link}
          </a>
        </p>
        <ul className="list pl0">
          {systems.map(({name: systemName, notes, extract}) => (
            <li className="list pb3" key={systemName}>
              <b>Description:</b> {systemName}
              <br />
              <b>Notes:</b> {notes === "" ? <i>None</i> : notes}
              <br />
              <b>Extracts:</b> {extract === "" ? <i>None</i> : extract}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  mapMarkers() {
    const {impacts, activeMarker} = this.state;

    return impacts.map(({id, name, count, location}) => {
      const isActive = activeMarker != null && activeMarker === name;
      const icon = L.divIcon({
        html: `<span class='marker-content silver'>${count}</span>`,
        className: isActive ? "marker-active" : "marker",
        iconSize: L.point(20, 20),
        popupAnchor: L.point(0, 0),
      });
      return (
        <Marker
          key={id}
          position={location}
          icon={icon}
          onClick={() => this.clickMarker(name)}
        >
          <Tooltip>
            <div>
              {name}, Occurences: {count}
            </div>
          </Tooltip>
        </Marker>
      );
    });
  }

  render() {
    const {position, zoom} = this.props;
    const markers = this.mapMarkers();
    const details = this.details();
    return (
      <div>
        <Header />
        <article className="cf ph2-ns flex items-center bg-gradient">
          <div className="w-100 w-100-m w-50-ns pa4 ml5-ns">
            <h2 className="f-subheadline-ns f2 lh-solid primary-color ttu bw3 ">
              Impacts
            </h2>
            <p className="f4 i mid-gray">Sky News</p>
          </div>
          <div className="w-50-ns dn dn-m dt-ns">
            <img
              className="w-40 pl7 pb2"
              alt=""
              src="/images/case-studies.png"
            />
          </div>
        </article>
        <div className="cf mt3 ph1-ns flex flex-column">
          <div className="w-75 center pt3 dn di-ns">
            <Map
              id="map"
              center={position}
              zoom={zoom}
              minZoom={zoom}
              zoomControl={false}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              />
              <MarkerClusterGroup showCoverageOnHover={false}>
                {markers}
              </MarkerClusterGroup>
              <ZoomControl position="bottomright" />
            </Map>
          </div>
          <div className="w-75 center pt3 dn di-ns">{details}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SkyNews;
