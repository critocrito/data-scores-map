// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import Spinner from "react-spinkit";
import type DocumentStore from "../../stores/document";

type Props = {
  store: DocumentStore,
};

const DataDetails = observer(({store}: Props) => {
  const view = store.document ? (
    <div className="flex">
      <Link to="/" onClick={() => store.reset()}>
        <i className="f1 lh-title pa2 ma2 fas fa-angle-left" />
      </Link>
      <div className="tl flex flex-column">
        <h3 className="f1 lh-title pt0 mt0 pb0 mb0">
          {store.document.title}{" "}
          <a className="f4 lh-copy no-underline" href={store.document.href}>
            (Source)
          </a>
        </h3>

        <dl className="tl list">
          <dt className="b">Description</dt>
          <dd>{store.document.description}</dd>
          <dt className="b">Search Category</dt>
          <dd>{store.document.searchCategory}</dd>
          <dt className="b">Keywords</dt>
          <dd>
            <ul className="list ma0 pa0">
              {(store.document.keywords || []).map(k => <li key={k}>{k}</li>)}
            </ul>
          </dd>
          <dt className="b">Council Areas</dt>
          <dd>
            <ul className="list ma0 pa0">
              {(store.document ? store.document.councilAreas : []).map(c => (
                <li key={c.council}>{c.council}</li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  ) : (
    <div className="flex justify-around mt5">
      <Spinner className="f1 lh-title" name="double-bounce" />
    </div>
  );

  return view;
});

export default DataDetails;
