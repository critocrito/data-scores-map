// @flow
import * as React from "react";
import {Marker, Tooltip} from "react-leaflet";
import * as L from "leaflet";

import "./index.css";
import type {Position} from "../../lib/types";

type Props = {
  name: string,
  count: number,
  position: Position,
};

const InsightsVizMapMarker = ({name, count, position}: Props) => {
  const icon = L.divIcon({
    html: `<span class='marker-content'>${count}</span>`,
    className: "marker",
    iconSize: L.point(20, 20),
    popupAnchor: L.point(0, 0),
  });
  return (
    <Marker position={position} icon={icon}>
      <Tooltip>
        <div>
          {name}, Documents: {count}
        </div>
      </Tooltip>
    </Marker>
  );
};

export default InsightsVizMapMarker;
