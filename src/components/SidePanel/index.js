// @flow
import * as React from "react";
import type {City} from "../../lib/types";

type Props = {
  cities: Array<City>,
};

class SidePanel extends React.Component<Props> {
  static defaultProps = {
    cities: [],
  };

  keywords(): Array<string> {
    const keys = new Set();
    this.props.cities.map(city => city.keywords.forEach(k => keys.add(k)));
    return Array.from(keys);
  }
  render() {
    const keywords = this.keywords().map(k => <li key={k}>{k}</li>);
    const cities = this.props.cities.map(c => (
      <li key={c.id}>
        {c.name} ({c.county})
      </li>
    ));
    return (
      <article className="debug">
        <section className="flex">
          <div className="w-50">
            <button>Keywords</button>
          </div>
          <div className="w-50">
            <button>Cities</button>
          </div>
        </section>
        <section className="flex">
          <ul className="list pa3">{cities}</ul>
        </section>
        <section className="flex">
          <ul className="list pa3">{keywords}</ul>
        </section>
      </article>
    );
  }
}

export default SidePanel;
