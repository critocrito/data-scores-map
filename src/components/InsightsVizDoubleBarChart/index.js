// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Bar} from "react-chartjs-2";

import {
  systems as systemMappings,
  colors as colorMappings,
} from "../../company-systems-mapping";
import type {CompanySystemInsight} from "../../lib/types";
import type Store from "../../lib/store";

type ChartData = {
  labels: Array<string>,
  datasets: Array<{
    data: Array<{x: string, y: number}>,
    backgroundColor: Array<string>,
  }>,
};

type Props = {
  companiesSystems: CompanySystemInsight[],
  fetchDocuments: () => void,
  store: Store,
};

const chartData = (obj: {[string]: number}, filters: string[]): ChartData => Object.keys(obj)
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
        const isActiveFilter = filters.find((elem) => elem === key);
        const baseLabel =
          colorMappings[key] != null ? "" : `${systemMappings[key]}: `;
        const baseColor = colorMappings[key]
          ? colorMappings[key]
          : colorMappings[systemMappings[key]];
        const color = isActiveFilter != null ? "#FFED00" : baseColor;
        const [entry] = memo.datasets;
        const labels = Array.from(
          new Set(memo.labels).add(`${baseLabel}${key}`),
        );
        const data = entry.data.concat({x: key, y: count});
        const backgroundColor = entry.backgroundColor.concat(color);

        return {
          labels,
          datasets: [{data, backgroundColor}],
        };
      },
      {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
    );

@observer
class InsightsVizDoubleBarChart extends React.Component<Props> {
  clickCompaniesBar = (elements: Array<{_model: {label: string}}>) => {
    const {store, fetchDocuments} = this.props;
    const [element] = elements;
    if (!element) return;
    const {_model: model} = element;
    const companies = store.companyFilters || [];
    store.updateFilters(
      "companies",
      companies.find((elem) => elem === model.label)
        ? companies.filter((elem) => elem !== model.label)
        : Array.from(new Set(companies).add(model.label)),
    );
    fetchDocuments();
  };

  clickSystemsBar = (elements: Array<{_model: {label: string}}>) => {
    const {store, fetchDocuments} = this.props;
    const [element] = elements;
    if (!element) return;
    const {_model: model} = element;
    const label = model.label.replace(/.*:\s/, "");
    const systems = store.systemFilters || [];
    store.updateFilters(
      "systems",
      systems.find((elem) => elem === label)
        ? systems.filter((elem) => elem !== label)
        : Array.from(new Set(systems).add(label)),
    );
    fetchDocuments();
  };

  render() {
    const {companiesSystems, store} = this.props;
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

    const companiesData = chartData(
      companiesSystems.reduce(
        (memo, {name, count}) => Object.assign(memo, {[name]: count}),
        {},
      ),
      store.companyFilters || [],
    );

    const systemsData = chartData(
      companiesSystems.reduce(
        (memo, {systems}) =>
          systems.reduce((acc, {name, count}) => {
            const existingCount = memo[name] ? memo[name].count : 0;
            return Object.assign(acc, {
              [name]: existingCount + count,
            });
          }, memo),
        {},
      ),
      store.systemFilters || [],
    );

    return (
      <div className="flex">
        <div className="w-50">
          <Bar
            data={companiesData}
            width={550}
            height={350}
            options={chartOptions}
            onElementsClick={this.clickCompaniesBar}
          />
        </div>
        <div className="w-50">
          <Bar
            data={systemsData}
            width={550}
            height={426}
            options={chartOptions}
            onElementsClick={this.clickSystemsBar}
          />
        </div>
      </div>
    );
  }
}

export default InsightsVizDoubleBarChart;
