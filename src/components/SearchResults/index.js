// @flow
import * as React from "react";
import {observer} from "mobx-react";

import "./index.css";
import SearchResultsItem from "../SearchResultsItem";
import SearchStore from "../../stores/search";

type Props = {
  store: SearchStore,
};

@observer
// eslint-disable-next-line react/prefer-stateless-function
class SearchResults extends React.Component<Props> {
  render() {
    const {store} = this.props;
    return (
      <span className="search-result">
        <div className="dataset">
          <span>
            {(store.results || []).map(r => (
              <SearchResultsItem key={r.id} {...r} />
            ))}
          </span>
        </div>
      </span>
    );
  }
}

export default SearchResults;
