// @flow
import * as React from "react";
import {observer} from "mobx-react";

import "./index.css";
import SidePanel from "../SidePanel";
import MapContainer from "../MapContainer";
import DataView from "../DataView";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

type State = {
  list: string,
};

@observer
class DataNav extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      list: "keywords",
    };
  }

  toggleList() {
    this.props.store.reset();
    this.setState({
      list: this.state.list === "keywords" ? "cities" : "keywords",
    });
  }

  resetList() {
    this.props.store.reset();
  }

  render() {
    const {list} = this.state;

    return (
      <section>
        <article className="flex">
          <div className="sp-wrapper w-third">
            <SidePanel
              store={this.props.store}
              toggleList={() => this.toggleList()}
              resetList={() => this.resetList()}
              activeList={list}
            />
          </div>
          <div className="w-two-thirds">
            <MapContainer store={this.props.store} />
          </div>
        </article>
        <article>
          Cities: {this.props.store.citiesCount}, Documents:{" "}
          {this.props.store.documentsCount}
        </article>
        <article>
          <DataView store={this.props.store} />
        </article>
      </section>
    );
  }
}

export default DataNav;
