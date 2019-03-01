// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Map, ZoomControl, TileLayer, Marker, Tooltip} from "react-leaflet";
import * as L from "leaflet";

import "./index.css";
import "../InsightsVizMap/index.css";
import "../InsightsVizMapMarker/index.css";
import Header from "../Header";
import Footer from "../Footer";
import {predictiveAnalyticsImpacts} from "../../lib/requests";
import type {PredictiveAnalyticsImpact, Position} from "../../lib/types";

type Props = {
  position?: Position,
  zoom?: number,
};

type State = {
  impacts: PredictiveAnalyticsImpact[],
  activeMarker: null | string,
};

@observer
class ImpactPredictiveAnalytics extends React.Component<Props, State> {
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
      const {data} = await predictiveAnalyticsImpacts();
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
        <h1 className="f4 lh-copy">
          {name}
          <br />
          <a
            className="link primary-color f5"
            target="_blank"
            rel="noopener noreferrer"
            href={link}
          >
            {link}
          </a>
        </h1>
        <p />
        <ul className="list pl0 pb3 impact-list">
          {systems.map(({name: systemName, notes, extract}) => (
            <li className="list pa3" key={systemName}>
              <h1 className="f5 lh-copy">{systemName}</h1>
              {notes === "" ? "" : <div>{notes}</div>}
              {extract === "" ? (
                ""
              ) : (
                <div className="mt2">
                  <b>FOI Extract:</b> {extract}
                </div>
              )}
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
              Overviews
            </h2>
            <p className="f4 i mid-gray">
              Toward a Map of Predictive Analytics
            </p>
            <p className="f4 near-black">
              Here we have collected a list of all the predictive analytics
              systems in public services that we know about and mapped them
              according to location. The list is based on responses to 423
              Freedom of Information requests and additional desk research. The
              list only includes information we have been provided with or found
              ourselves and is not a complete list of all instances of
              predictive analytics in the UK.
            </p>
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
          <div className="w-75-ns w-90 center pt3 di-ns">
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
              {markers}
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

export default ImpactPredictiveAnalytics;
