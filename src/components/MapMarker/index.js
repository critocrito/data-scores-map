// @flow
import * as React from "react";
import {Marker} from "react-leaflet";
import * as L from "leaflet";

import "./index.css";
import MarkerPopup from "../MarkerPopup";
import colors from "../../lib/colors";
import type {Place} from "../../lib/types";

type Props = {
  entity: Place,
  countByKeywords: {[keyword: string]: number},
};

const MapMarker = ({entity, countByKeywords}: Props) => {
  const {id, count, position} = entity;
  const icon = L.divIcon({
    html: `<span class='marker-content'>${count}</span>`,
    className: `marker marker-${id}`,
    iconSize: L.point(20, 20),
    popupAnchor: L.point(0, 0),
  });
  const chartData = Object.keys(countByKeywords)
    .sort((a, b) => a.localeCompare(b))
    .reduce(
      (memo, key) => {
        const [color, hoverColor] = colors(key);
        const [entry] = memo.datasets;
        const labels = Array.from(new Set(memo.labels).add(key));
        const data = entry.data.concat(countByKeywords[key]);
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

export default MapMarker;
