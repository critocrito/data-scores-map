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
      list: this.state.list === "keywords" ? "entities" : "keywords",
    });
  }

  toggleEntity() {
    this.props.store.toggleEntity();
    this.props.store.reset();
  }

  resetList() {
    this.props.store.reset();
  }

  render() {
    const {store} = this.props;
    const {list} = this.state;
    const stats = store.isCitiesEntity() ? (
      <span>
        <b>Cities:</b> {store.citiesCount}
      </span>
    ) : (
      <span>
        <b>Councils:</b> {store.councilsCount}
      </span>
    );

    return (
      <section>
        <article className="flex">
          <div className="sp-wrapper w-third">
            <SidePanel
              store={this.props.store}
              toggleList={() => this.toggleList()}
              toggleEntity={() => this.toggleEntity()}
              resetList={() => this.resetList()}
              activeList={list}
            />
          </div>
          <div className="w-two-thirds">
            <MapContainer store={this.props.store} />
          </div>
        </article>
        <article>
          {stats} <b>Documents:</b> {this.props.store.documentsCount}
        </article>
        <article>
          <DataView store={this.props.store} />
        </article>
      </section>
    );
  }
}

export default DataNav;
