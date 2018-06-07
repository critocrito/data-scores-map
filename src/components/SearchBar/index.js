// @flow
import * as React from "react";
import {fromEvent, fromPromise, merge} from "most";

import "./index.css";
import SearchResults from "../SearchResults";
import {search} from "../../lib/requests";
import SearchStore from "../../stores/search";

type Props = {
  name: string,
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
      .debounce(500)
      .map(search)
      .map(fromPromise)
      // $FlowFixMe
      .switchLatest()
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
      <form>
        <span className="search_bar">
          <input
            // eslint-disable-next-line no-return-assign
            ref={element => (this.inputElement = element)}
            type="text"
            className="search_bar"
            placeholder={`Work in ${this.props.name}`}
            autoComplete="off"
            spellCheck="false"
          />
        </span>
        <SearchResults store={store} />
      </form>
    );
  }
}

export default SearchBar;
