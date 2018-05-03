// @flow
import * as React from "react";
// $FlowFixMe
import {Popup} from "react-leaflet";
// $FlowFixMe
import {Doughnut} from "react-chartjs-2";
import "./index.css";

type Props = {
  city: string,
  county: string,
  unitsCount: number,
  position: [number, number],
  chartData: {
    labels: Array<string>,
    datasets: Array<{
      data: Array<number>,
      backgroundColor: Array<string>,
      hoverBackgroundColor: Array<string>,
    }>,
  },
};

const MarkerPopup = ({
  city,
  county,
  unitsCount,
  position,
  chartData,
}: Props) => {
  const chartOptions = {
    legend: {
      position: "right",
    },
  };

  return (
    <Popup className="marker-popup" position={position}>
      <div>
        <header className="marker-popup-title">
          {city} ({county})
        </header>
        <main className="flex">
          <section className="w-25 pa2 mr2">
            <span>Units:</span>
            <span>{unitsCount}</span>
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
