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

const DataNav = observer(({store}: Props) => (
  <section>
    <h1>Map of Councils</h1>
    <article className="flex">
      <div className="sp-wrapper w-third">
        <SidePanel store={store} />
      </div>
      <div className="w-two-thirds">
        <MapContainer store={store} />
      </div>
    </article>
    <article>
      <span>
        <b>Councils:</b> {store.councilsCount}
      </span>{" "}
      <span>
        <b>Documents:</b> {store.documentsCount}
      </span>
    </article>
    <article>
      <DataView store={store} />
    </article>
  </section>
));

export default DataNav;
