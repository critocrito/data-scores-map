// @flow
import * as React from "react";

import "./index.css";
import SearchWidget from "../SearchWidget";

type Props = {};

type State = {
  highlightedText: string,
  top: number,
  left: number,
};

class CaseStudies extends React.Component<Props, State> {
  state = {
    highlightedText: "",
    top: 0,
    left: 0,
  };

  componentDidMount() {
    document.addEventListener("selectionchange", this.onSelectionChange);
  }

  componentWillUnmount() {
    document.removeEventListener("selectionchange", this.onSelectionChange);
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
    const {highlightedText, top, left} = this.state;
    const widgetStyle =
      highlightedText === ""
        ? {
            display: "none",
          }
        : {top, left, display: "block", position: "absolute"};

    return (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div id="cal1">&nbsp;</div>
        <div id="cal2">&nbsp;</div>
        <SearchWidget
          searchTerm={highlightedText}
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
