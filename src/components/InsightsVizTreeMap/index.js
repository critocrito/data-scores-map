// @flow
import * as React from "react";
import {View, Info, changeset, parse} from "vega";
import vegaTooltip from "vega-tooltip";

import {toId} from "../../lib/utils";
import type {DepartmentInsight} from "../../lib/types";

type Props = {
  departments: DepartmentInsight[],
};

type State = {
  vis: ?View,
};

const spec = () => ({
  $schema: "https://vega.github.io/schema/vega/v4.json",
  width: 960,
  height: 500,
  padding: 2.5,
  autosize: {type: "fit", resize: true},

  data: [
    {
      name: "tree",
      transform: [
        {
          type: "stratify",
          key: "id",
          parentKey: "parent",
        },
        {
          type: "treemap",
          field: "size",
          sort: {field: "value"},
          round: true,
          method: "squarify",
          ratio: {value: 1.6},
          size: [{signal: "width"}, {signal: "height"}],
        },
      ],
    },
    {
      name: "nodes",
      source: "tree",
      transform: [{type: "filter", expr: "datum.children"}],
    },
    {
      name: "leaves",
      source: "tree",
      transform: [{type: "filter", expr: "!datum.children"}],
    },
  ],

  scales: [
    {
      name: "color",
      type: "ordinal",
      range: {scheme: "tableau20"},
    },
    {
      name: "size",
      type: "ordinal",
      domain: [0, 1, 2, 3],
      range: [256, 28, 20, 14],
    },
    {
      name: "opacity",
      type: "ordinal",
      domain: [0, 1, 2, 3],
      range: [0.15, 0.5, 0.8, 1.0],
    },
  ],

  marks: [
    {
      type: "rect",
      from: {data: "nodes"},
      interactive: false,
      encode: {
        enter: {
          fill: {scale: "color", field: "name"},
        },
        update: {
          x: {field: "x0"},
          y: {field: "y0"},
          x2: {field: "x1"},
          y2: {field: "y1"},
        },
      },
    },
    {
      type: "rect",
      from: {data: "leaves"},
      encode: {
        enter: {
          stroke: {value: "#fff"},
          tooltip: {
            signal:
              "{'Category': datum.tag, 'Department': datum.name, 'Documents': datum.size}",
          },
        },
        update: {
          x: {field: "x0"},
          y: {field: "y0"},
          x2: {field: "x1"},
          y2: {field: "y1"},
          fill: {value: "transparent"},
        },
        hover: {
          fill: {value: "#ffed00"},
        },
      },
    },
    {
      type: "text",
      from: {data: "nodes"},
      interactive: false,
      encode: {
        enter: {
          font: {value: "Helvetica Neue, Arial"},
          align: {value: "left"},
          dx: {value: -20},
          baseline: {value: "middle"},
          fill: {value: "#000"},
          text: {field: "name"},
          fontSize: {value: 16},
          fillOpacity: {scale: "opacity", field: "depth"},
        },
        update: {
          x: {signal: "0.5 * (datum.x0 + datum.x1)"},
          y: {signal: "0.5 * (datum.y0 + datum.y1)"},
        },
      },
    },
  ],
});

class InsightsVizTreeMap extends React.Component<Props, State> {
  static defaultProps = {
    categories: [],
  };

  state = {
    vis: null,
  };

  componentDidMount() {
    const {departments} = this.props;

    const vis = new View(parse(spec()))
      .logLevel(Info)
      .renderer("canvas")
      .resize()
      .width(this.vizRef ? this.vizRef.offsetWidth : 960)
      .initialize(this.vizRef)
      .insert("tree", this.insightsTree(departments))
      .hover()
      .run();
    vegaTooltip(vis);

    if (typeof window !== "undefined")
      window.addEventListener("resize", this.onResize, false);

    this.setState({vis});
  }

  componentDidUpdate() {
    const {departments} = this.props;
    const {vis} = this.state;

    if (vis)
      vis
        .change(
          "tree",
          changeset()
            .remove(() => true)
            .insert(this.insightsTree(departments)),
        )
        .run();
  }

  componentWillUnmount() {
    const {vis} = this.state;
    if (vis) vis.finalize();
    if (typeof window !== "undefined")
      window.removeEventListener("resize", this.onResize);
  }

  onResize = () => {
    const {vis} = this.state;

    if (vis && this.vizRef) vis.width(this.vizRef.clientWidth).run();
  };

  insightsTree = (insights: DepartmentInsight[]) => {
    const tags = {};
    return insights.reduce(
      (memo, {id, tag, name, count}) => {
        if (tag == null) return memo;
        const tagId = toId(tag);
        const elem = {id, name, tag, size: count};
        if (tags[tagId])
          return memo.concat(Object.assign({}, elem, {parent: tagId}));
        tags[tagId] = {id: tagId, name: tag, parent: "flare"};
        return memo.concat([
          tags[tagId],
          Object.assign({}, elem, {parent: tagId}),
        ]);
      },
      [{id: "flare", name: ""}],
    );
  };

  vizRef: null | HTMLDivElement;

  render() {
    // eslint-disable-next-line no-return-assign
    return <div ref={(elem) => (this.vizRef = elem)} />;
  }
}

export default InsightsVizTreeMap;
