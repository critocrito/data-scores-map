// @flow
import * as React from "react";
// $FlowFixMe
import {Marker, Popup} from "react-leaflet";
import L from "leaflet";
import "./index.css";

type Props = {
  id: string,
  city: string,
  county: string,
  unitsCount: number,
  position: [number, number],
};
export default ({id, unitsCount, position, city, county}: Props) => {
  const icon = L.divIcon({
    html: `<span class='marker-content'>${unitsCount}</span>`,
    className: `marker marker-${id}`,
    iconSize: L.point(20, 20),
    popupAnchor: L.point(0, 0),
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <span>
          {city} ({county})
          <br />
          {unitsCount} units
        </span>
      </Popup>
    </Marker>
  );
};
