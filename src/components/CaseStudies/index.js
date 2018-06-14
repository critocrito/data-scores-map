// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {fromEvent, fromPromise, merge, switchLatest} from "most";
import marked from "marked";

import "./index.css";
import SearchWidget from "../SearchWidget";
import {search} from "../../lib/requests";
import type SearchStore from "../../stores/search";

// $FlowFixMe
import text from "../../../markdown/kent.md";

type Props = {
  searchStore: SearchStore,
};

type State = {
  highlightedText: string,
  top: number,
  left: number,
};

@observer
class CaseStudies extends React.Component<Props, State> {
  state = {
    highlightedText: "",
    top: 0,
    left: 0,
  };

  componentDidMount() {
    const {searchStore} = this.props;
    // document.addEventListener("selectionchange", this.onSelectionChange);
    const searchText = fromEvent("selectionchange", document)
      .map(() => {
        const selection = document.getSelection();
        if (!selection || selection.isCollapsed) return "";
        return selection.toString();
      })
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
    merge(emptyResults, results).observe(data => searchStore.setResults(data));
  }

  componentWillUnmount() {
    // document.removeEventListener("selectionchange", this.onSelectionChange);
  }

  onSelectionChange = () => {
    const selection = document.getSelection();
    if (!selection) return;
    if (selection.isCollapsed) {
      this.setState({highlightedText: ""});
    } else {
      const rect = selection.getRangeAt(0).getBoundingClientRect();
      const [top, left] = this.tooltipPosition(rect);
      this.setState({highlightedText: selection.toString(), top, left});
    }
  };

  onClick = (e: Event) => {
    e.preventDefault();
  };

  tooltipPosition = (selectionRect: ClientRect): [number, number] => {
    const cal1 = document.getElementById("cal1");
    const cal2 = document.getElementById("cal2");
    if (!cal1 || !cal2) return [0, 0];
    const rel1 = document.createRange();
    const rel2 = document.createRange();
    rel1.selectNode(cal1);
    rel2.selectNode(cal2);
    const rb1 = rel1.getBoundingClientRect();
    const rb2 = rel2.getBoundingClientRect();
    const top = ((selectionRect.bottom - rb2.top) * 100) / (rb1.top - rb2.top);
    const left =
      ((selectionRect.left - rb2.left) * 100) / (rb1.left - rb2.left);
    return [top, left];
  };

  render() {
    const {searchStore} = this.props;
    const {highlightedText, top, left} = this.state;
    const widgetStyle =
      highlightedText === ""
        ? {
            display: "none",
          }
        : {top, left, display: "block", position: "absolute"};
    const searchCount = searchStore.results.length;

    return (
      <div className="flex pa3 ma3">
        <div
          className="w-70"
          dangerouslySetInnerHTML={{__html: marked(text)}}
        />
        <div id="cal1">&nbsp;</div>
        <div id="cal2">&nbsp;</div>
        <SearchWidget
          searchTerm={highlightedText}
          searchCount={searchCount}
          style={widgetStyle}
          onClick={this.onClick}
        >
          &nbsp;
        </SearchWidget>
      </div>
    );
  }
}

export default CaseStudies;
