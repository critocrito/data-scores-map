// @flow
import * as React from "react";
import {Bar} from "react-chartjs-2";

import type {CategoryInsight} from "../../lib/types";

type ChartData = {
  labels: Array<string>,
  datasets: Array<{
    data: Array<{x: string, y: number}>,
    backgroundColor: Array<string>,
    hoverBackgroundColor: Array<string>,
  }>,
};

type Props = {
  categories: CategoryInsight[],
};

const chartData = (obj: {[string]: number}): ChartData =>
  Object.keys(obj)
    .filter((key) => obj[key] > 0)
    .sort((a, b) => {
      // ensure this order to render the bars with the highest one to the left
      if (obj[a] < obj[b]) return 1;
      if (obj[a] > obj[b]) return -1;
      return 0;
    })
    .reduce(
      (memo, key) => {
        const count = obj[key];
        const [color, hoverColor] = ["#13517A", "#297BB1"];
        const [entry] = memo.datasets;
        const labels = Array.from(new Set(memo.labels).add(key));
        const data = entry.data.concat({x: key, y: count});
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

const InsightsVizBarChart = ({categories}: Props) => {
  const chartOptions = {
    legend: {
      // position: "bottom",
      display: false,
      labels: {
        boxWidth: 5,
      },
    },
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  const data = chartData(
    categories.reduce(
      (memo, {name, count}) => Object.assign(memo, {[name]: count}),
      {},
    ),
  );

  return <Bar data={data} width={550} height={300} options={chartOptions} />;
};

export default InsightsVizBarChart;
