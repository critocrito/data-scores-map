// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Doughnut} from "react-chartjs-2";

import type Store from "../../lib/store";
import colors from "../../lib/colors";

type ChartData = {
  labels: Array<string>,
  datasets: Array<{
    data: number[],
    backgroundColor: Array<string>,
  }>,
};

type Props = {
  entities: {[string]: string[]},
  fetchDocuments: () => void,
  store: Store,
};

const chartData = (obj: {[string]: string[]}, filters: string[]): ChartData =>
  Object.keys(obj)
    .sort((a, b) => {
      // ensure this order to render the bars with the highest one to the left
      if (obj[a].length < obj[b].length) return 1;
      if (obj[a].length > obj[b].length) return -1;
      return 0;
    })
    .reduce(
      (memo, key) => {
        const count = obj[key].length;
        const isActiveFilter = filters.find((elem) => elem === key);
        const color = isActiveFilter != null ? "#FFED00" : colors(key);
        const [entry] = memo.datasets;
        const labels = Array.from(new Set(memo.labels).add(key));
        const data = entry.data.concat(count);
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
class InsightsVizBubbleChart extends React.Component<Props> {
  clickEntity = (elements: Array<{_model: {label: string}}>) => {
    const {fetchDocuments, store} = this.props;
    const [element] = elements;
    if (!element) return;
    const {_model: model} = element;
    const {label} = model;
    const entities = store.entityFilters || [];
    store.updateFilters(
      "entities",
      entities.find((elem) => elem === label)
        ? entities.filter((elem) => elem !== label)
        : Array.from(new Set(entities).add(label)),
    );
    fetchDocuments();
  };

  render() {
    const {entities} = this.props;
    const entityData = chartData(entities, []);
    const chartOptions = {
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 5,
        },
      },
      scales: {
        scaleShowValues: true,
      },
    };
    return (
      <div className="flex">
        <div className="w-100">
          <Doughnut
            data={entityData}
            options={chartOptions}
            onElementsClick={this.clickEntity}
          />
        </div>
      </div>
    );
  }
}

export default InsightsVizBubbleChart;
