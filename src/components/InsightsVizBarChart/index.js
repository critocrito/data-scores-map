// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Bar} from "react-chartjs-2";

import type {DepartmentInsight} from "../../lib/types";
import type Store from "../../lib/store";

type ChartData = {
  labels: Array<string>,
  datasets: Array<{
    data: Array<{x: string, y: number}>,
    backgroundColor: Array<string>,
  }>,
};

type Props = {
  departments: DepartmentInsight[],
  fetchDocuments: () => void,
  store: Store,
};

const chartData = (obj: {[string]: number}, filters: string[]): ChartData =>
  Object.keys(obj)
    .filter((key) => obj[key] > 2 && key !== "Monitor")
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
        const color = isActiveFilter != null ? "#FFED00" : "#13517A";
        const [entry] = memo.datasets;
        const labels = Array.from(new Set(memo.labels).add(key));
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
class InsightsVizBarChart extends React.Component<Props> {
  clickBar = (elements: Array<{_model: {label: string}}>) => {
    const {store, fetchDocuments} = this.props;
    const [element] = elements;
    if (!element) return;
    const {_model: model} = element;
    const departments = store.departmentFilters || [];
    store.updateFilters(
      "departments",
      departments.find((elem) => elem === model.label)
        ? departments.filter((elem) => elem !== model.label)
        : Array.from(new Set(departments).add(model.label)),
    );
    fetchDocuments();
  };

  render() {
    const {departments, store} = this.props;
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

    const data = chartData(
      departments.reduce(
        (memo, {name, count}) => Object.assign(memo, {[name]: count}),
        {},
      ),
      store.departmentFilters || [],
    );
    return (
      <Bar
        data={data}
        width={550}
        height={300}
        options={chartOptions}
        onElementsClick={this.clickBar}
      />
    );
  }
}

export default InsightsVizBarChart;
