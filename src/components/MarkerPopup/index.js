// @flow
import * as React from "react";
import {Popup} from "react-leaflet";
import {Doughnut} from "react-chartjs-2";
import "./index.css";
import type {Council} from "../../lib/types";

type Props = {
  council: Council,
  chartData: {
    labels: Array<string>,
    datasets: Array<{
      data: Array<number>,
      backgroundColor: Array<string>,
      hoverBackgroundColor: Array<string>,
    }>,
  },
};

const MarkerPopup = ({council, chartData}: Props) => {
  const chartOptions = {
    legend: {
      position: "right",
    },
  };

  const {name, position, count} = council;

  return (
    <Popup className="marker-popup" position={position}>
      <div>
        <header className="marker-popup-title">{name}</header>
        <main className="flex">
          <section className="w-25 pa2 mr2">
            <span>Units:</span>
            <span>{count}</span>
          </section>
          <section className="w-75 h-5 pa2 mr2">
            <Doughnut
              data={chartData}
              width={100}
              height={50}
              options={chartOptions}
            />
          </section>
        </main>
      </div>
    </Popup>
  );
};

export default MarkerPopup;
