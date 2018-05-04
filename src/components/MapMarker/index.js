// @flow
import * as React from "react";
// $FlowFixMe
import {Marker} from "react-leaflet";
import L from "leaflet";
// $FlowFixMe

import "./index.css";
import MarkerPopup from "../MarkerPopup";
import {randomRgbas} from "../../lib/colors";
import type {City} from "../../lib/types";

type Props = {
  entity: City,
};

export default ({entity}: Props) => {
  const {id, count, unitsByKeywords, position} = entity;
  const icon = L.divIcon({
    html: `<span class='marker-content'>${count}</span>`,
    className: `marker marker-${id}`,
    iconSize: L.point(20, 20),
    popupAnchor: L.point(0, 0),
  });
  const chartData = Object.keys(unitsByKeywords).reduce(
    (memo, key) => {
      const [color, hoverColor] = randomRgbas();
      const [entry] = memo.datasets;
      const labels = Array.from(new Set(memo.labels).add(key));
      const data = entry.data.concat(unitsByKeywords[key].length);
      const backgroundColor = entry.backgroundColor.concat(color);
      const hoverBackgroundColor = entry.hoverBackgroundColor.concat(
        hoverColor,
      );
      return {
        labels,
        datasets: [{data, backgroundColor, hoverBackgroundColor}],
      };
    },
    {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
    },
  );
  return (
    <Marker position={position} icon={icon}>
      <MarkerPopup entity={entity} chartData={chartData} />
    </Marker>
  );
};
