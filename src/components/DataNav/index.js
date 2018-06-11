// @flow
import * as React from "react";
import {Route, withRouter} from "react-router-dom";
import {observer} from "mobx-react";

import "./index.css";
import SidePanel from "../SidePanel";
import MapContainer from "../MapContainer";
import DataView from "../DataView";
import DataDetails from "../DataDetails";
import {DocumentContext} from "../../lib/contexts";
import type Store from "../../lib/store";

type Props = {
  store: Store,
};

const DataNav = withRouter(
  observer(({store}: Props) => (
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
        <Route exact path="/" render={() => <DataView store={store} />} />
        <Route
          path="/:docId"
          render={props => (
            <DocumentContext.Consumer>
              {({store: documentStore}) => (
                <DataDetails store={documentStore} {...props} />
              )}
            </DocumentContext.Consumer>
          )}
        />
      </article>
    </section>
  )),
);

export default DataNav;
