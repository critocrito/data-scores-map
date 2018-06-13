// @flow
import * as React from "react";
import {fromEvent, fromPromise, merge, switchLatest} from "most";

import "./index.css";
import SearchResults from "../SearchResults";
import {search} from "../../lib/requests";
import SearchStore from "../../stores/search";

type Props = {
  store: SearchStore,
};

class SearchBar extends React.Component<Props> {
  static defaultProps = {
    name: "Progress",
  };

  componentDidMount() {
    const {store} = this.props;
    const searchText = fromEvent("input", this.inputElement)
      .map(ev => ev.target.value.trim())
      .skipRepeats()
      .multicast();
    const results = searchText
      .filter(term => term.length > 1)
      .map(search)
      .map(fromPromise)
      .thru(switchLatest)
      .filter(({data}) => data.length > 0)
      .map(({data}) => data);
    const emptyResults = searchText
      .filter(term => term.length <= 1)
      .constant([]);
    merge(emptyResults, results).observe(data => store.setResults(data));
  }

  inputElement: ?HTMLInputElement;

  render() {
    const {store} = this.props;
    return (
      <form role="search">
        <span>
          <input
            name="q"
            // eslint-disable-next-line no-return-assign
            ref={element => (this.inputElement = element)}
            type="search"
            className="search_bar input-reset br4-l ba b--white-20 pl4"
            placeholder="Search Documents"
            autoComplete="off"
            spellCheck="false"
            aria-label="Search for observations."
          />
        </span>
        <SearchResults store={store} />
      </form>
    );
  }
}

export default SearchBar;
