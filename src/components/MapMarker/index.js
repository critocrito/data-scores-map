// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Marker} from "react-leaflet";
import * as L from "leaflet";

import "./index.css";
import MarkerPopup from "../MarkerPopup";
import colors from "../../lib/colors";
import type {Council} from "../../lib/types";
import type DocumentStore from "../../stores/document";

type Props = {
  council: Council,
  countByKeywords: {[keyword: string]: number},
  documentStore: DocumentStore,
};

const MapMarker = observer(
  ({council, countByKeywords, documentStore: store}: Props) => {
    const {id, count, position} = council;
    const className = store.document
      ? store.document.councilAreas.reduce(
          (memo, {council: c}) =>
            id === c ? memo.concat("marker-active") : memo,
          ["marker"],
        )
      : ["marker"];

    const icon = L.divIcon({
      html: `<span class='marker-content'>${count}</span>`,
      className: className.join(" "),
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
        <MarkerPopup council={council} chartData={chartData} />
      </Marker>
    );
  },
);

export default MapMarker;
