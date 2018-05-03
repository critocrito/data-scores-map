// @flow
import * as React from "react";
// $FlowFixMe
import {Marker} from "react-leaflet";
import L from "leaflet";
// $FlowFixMe
import randomcolor from "randomcolor";

import "./index.css";
import MarkerPopup from "../MarkerPopup";

type Props = {
  id: string,
  city: string,
  county: string,
  unitsCount: number,
  position: [number, number],
  unitsByKeywords: {[keyword: string]: Array<string>},
};

export default ({
  id,
  unitsCount,
  position,
  city,
  county,
  unitsByKeywords,
}: Props) => {
  const icon = L.divIcon({
    html: `<span class='marker-content'>${unitsCount}</span>`,
    className: `marker marker-${id}`,
    iconSize: L.point(20, 20),
    popupAnchor: L.point(0, 0),
  });
  const chartData = Object.keys(unitsByKeywords).reduce(
    (memo, key) => {
      const color = randomcolor({luminosity: "dark"});
      const [entry] = memo.datasets;
      const labels = Array.from(new Set(memo.labels).add(key));
      const data = entry.data.concat(unitsByKeywords[key].length);
      const backgroundColor = entry.backgroundColor.concat(color);
      const hoverBackgroundColor = entry.hoverBackgroundColor.concat(color);
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
      <MarkerPopup
        city={city}
        county={county}
        unitsCount={unitsCount}
        position={position}
        chartData={chartData}
      />
    </Marker>
  );
};
