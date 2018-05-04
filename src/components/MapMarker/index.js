// @flow
import * as React from "react";
// $FlowFixMe
import {Marker} from "react-leaflet";
import L from "leaflet";
// $FlowFixMe

import "./index.css";
import MarkerPopup from "../MarkerPopup";
import colors from "../../lib/colors";
import type {City} from "../../lib/types";

type Props = {
  entity: City,
  selected: Array<string>,
};

const MapMarker = ({entity, selected}: Props) => {
  const {id, count, unitsByKeywords, position} = entity;
  const icon = L.divIcon({
    html: `<span class='marker-content'>${count}</span>`,
    className: `marker marker-${id}`,
    iconSize: L.point(20, 20),
    popupAnchor: L.point(0, 0),
  });
  const chartData = Object.keys(unitsByKeywords)
    .sort((a, b) => a.localeCompare(b))
    .reduce(
      (memo, key, i) => {
        if (selected.length > 0 && !selected.includes(key)) return memo;
        const [color, hoverColor] = colors(i);
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

// FIXME: See https://github.com/yannickcr/eslint-plugin-react/issues/1593
MapMarker.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  selected: [],
};

export default MapMarker;
