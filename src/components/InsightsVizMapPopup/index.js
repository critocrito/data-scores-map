// @flow
import * as React from "react";
import {Popup} from "react-leaflet";
import {Doughnut} from "react-chartjs-2";
import "./index.css";
import type {Position} from "../../lib/types";

type ChartData = {
  labels: Array<string>,
  datasets: Array<{
    data: Array<number>,
    backgroundColor: Array<string>,
    hoverBackgroundColor: Array<string>,
  }>,
};

type Props = {
  name: string,
  count: number,
  position: Position,
  companiesChartData: ChartData,
  systemsChartData: ChartData,
};

const InsightsVizMapPopup = ({
  name,
  count,
  position,
  companiesChartData,
  systemsChartData,
}: Props) => {
  const chartOptions = {
    legend: {
      // position: "bottom",
      display: false,
      labels: {
        boxWidth: 5,
      },
    },
  };

  const companiesChart =
    companiesChartData.labels.length > 0 ? (
      <section className="w-50 pa2 mr2">
        <header>Companies</header>
        <Doughnut
          data={companiesChartData}
          width={100}
          height={50}
          options={chartOptions}
        />
      </section>
    ) : (
      ""
    );

  const systemsChart =
    systemsChartData.labels.length > 0 ? (
      <section className="w-50 pa2 mr2">
        <header>Systems</header>
        <Doughnut
          data={systemsChartData}
          width={100}
          height={50}
          options={chartOptions}
        />
      </section>
    ) : (
      ""
    );

  return (
    <Popup
      className="marker-popup w-100 pa0 ma0 block"
      position={position}
      closeButton={false}
    >
      <div>
        <header className="marker-popup-title pa2 w-100 nowrap bg-light-gray">
          {name} ({count} Documents)
        </header>
        <main className="flex">
          {companiesChart}
          {systemsChart}
        </main>
      </div>
    </Popup>
  );
};

export default InsightsVizMapPopup;
