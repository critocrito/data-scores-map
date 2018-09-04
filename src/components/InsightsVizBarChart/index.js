// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Bar} from "react-chartjs-2";

import type {CategoryInsight} from "../../lib/types";
import type Store from "../../lib/store";

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
  store: Store,
};

const chartData = (obj: {[string]: number}, filters: string[]): ChartData =>
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
        const isActiveFilter = filters.find((elem) => elem === key);
        const [color, hoverColor] =
          isActiveFilter != null
            ? ["#9a1a1a", "#9a1aaa"]
            : ["#13517A", "#297BB1"];
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

@observer
class InsightsVizBarChart extends React.Component<Props> {
  clickBar = (elements: Array<{_model: {label: string}}>) => {
    const {store} = this.props;
    const [element] = elements;
    if (!element) return;
    const {_model: model} = element;
    const categories = store.categoryFilters || [];
    store.updateFilters(
      "categories",
      categories.find((elem) => elem === model.label)
        ? categories.filter((elem) => elem !== model.label)
        : Array.from(new Set(categories).add(model.label)),
    );
  };

  render() {
    const {categories, store} = this.props;
    const chartOptions = {
      legend: {
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
      store.categoryFilters || [],
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
