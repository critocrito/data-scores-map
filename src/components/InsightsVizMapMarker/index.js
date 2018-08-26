// @flow
import * as React from "react";
import {Marker} from "react-leaflet";
import * as L from "leaflet";

import "./index.css";
import InsightsVizMapPopup from "../InsightsVizMapPopup";
import colors from "../../lib/colors";
import type {Position} from "../../lib/types";

type Props = {
  name: string,
  count: number,
  companies: {[string]: number},
  systems: {[string]: number},
  position: Position,
};

const chartData = (obj: {[string]: number}) =>
  Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .reduce(
      (memo, key) => {
        const count = obj[key];
        const [color, hoverColor] = colors(key);
        const [entry] = memo.datasets;
        const labels = Array.from(new Set(memo.labels).add(key));
        const data = entry.data.concat(count);
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

const InsightsVizMapMarker = ({
  name,
  count,
  companies,
  systems,
  position,
}: Props) => {
  const companiesChartData = chartData(companies);
  const systemsChartData = chartData(systems);

  const icon = L.divIcon({
    html: `<span class='marker-content'>${count}</span>`,
    className: "marker",
    iconSize: L.point(20, 20),
    popupAnchor: L.point(0, 0),
  });
  return (
    <Marker position={position} icon={icon}>
      <InsightsVizMapPopup
        name={name}
        count={count}
        position={position}
        companiesChartData={companiesChartData}
        systemsChartData={systemsChartData}
      />
    </Marker>
  );
};

export default InsightsVizMapMarker;
