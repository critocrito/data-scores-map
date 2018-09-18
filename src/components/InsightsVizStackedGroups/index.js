// @flow
import * as React from "react";
import {Bar} from "react-chartjs-2";

import colors from "../../lib/colors";
import type {CompanySystemInsight} from "../../lib/types";

type ChartData = {
  labels: Array<string>,
  datasets: Array<{
    label: string,
    stack: string,
    data: Array<{x: string, y: number}>,
    backgroundColor: Array<string>,
    hoverBackgroundColor: Array<string>,
  }>,
};

type Props = {
  companiesSystems: CompanySystemInsight[],
};

const chartData = (data, systemNames): ChartData =>
  data.reduce(
    (memo, {name, count, systems}) => {
      const [color, hoverColor] = ["#13517A", "#297BB1"];
      const [entry, ...entries] = memo.datasets;

      const companiesData = entry.data.concat({x: name, y: count});
      const systemsData = systemNames.reduce((acc, label) => {
        const systemEntry = entries.find((e) => e.label === label);
        if (!systemEntry) return acc;
        const [systemColor, systemHoverColor] = colors(label);
        const systemCount = systems[label];

        return acc.concat({
          label,
          stack: "Stack 1",
          data: systemEntry.data.concat({x: label, y: systemCount}),
          backgroundColor: systemEntry.backgroundColor.concat(systemColor),
          hoverBackgroundColor: systemEntry.hoverBackgroundColor.concat(
            systemHoverColor,
          ),
        });
      }, []);
      return {
        labels: memo.labels.concat(name),
        datasets: [
          {
            label: "Companies",
            stack: "Stack 0",
            data: companiesData,
            backgroundColor: entry.backgroundColor.concat(color),
            hoverBackgroundColor: entry.hoverBackgroundColor.concat(hoverColor),
          },
          ...systemsData,
        ],
      };
    },
    {
      labels: [],
      datasets: [
        {
          label: "Companies",
          stack: "Stack 0",
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
        ...systemNames.map((sn) => ({
          label: sn,
          stack: "Stack 1",
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        })),
      ],
    },
  );

const InsightsVizStackedGroups = ({companiesSystems}: Props) => {
  const chartOptions = {
    legend: {
      display: false,
      labels: {
        boxWidth: 5,
      },
    },
    scales: {
      scaleShowValues: true,
      xAxes: [
        {
          ticks: {
            autoSkip: false,
          },
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

  const defaultSystems = companiesSystems.reduce(
    (memo, {systems}) =>
      Object.assign(
        memo,
        systems.reduce(
          (acc, {name}) => Object.assign({}, acc, {[name]: 0}),
          {},
        ),
      ),
    {},
  );
  const chartdata = companiesSystems.map(({name, count, systems}) => {
    const companySystems = systems.reduce(
      (acc, {name: sn, count: sc}) => Object.assign({}, acc, {[sn]: sc}),
      {},
    );
    return {
      count,
      name,
      systems: Object.assign({}, defaultSystems, companySystems),
    };
  });

  const data = chartData(chartdata, Object.keys(defaultSystems));

  return <Bar data={data} width={550} height={300} options={chartOptions} />;
};

export default InsightsVizStackedGroups;
