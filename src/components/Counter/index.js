// @flow
import * as React from "react";
import Button from "../Button";

type State = {
  counter: number,
};

class Counter extends React.Component<{}, State> {
  state = {
    counter: 0,
  };

  incrementCounter = (): void => {
    this.setState(({counter}) => {
      if (typeof counter === "number") {
        return {counter: counter + 1};
      }
      return {counter};
    });
  };

  resetCounter = (): void => {
    this.setState(() => ({counter: 0}));
  };

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>
        <Button label="Increment" onButtonClick={this.incrementCounter} />
        <Button label="Reset" onButtonClick={this.resetCounter} />
      </div>
    );
  }
}

export default Counter;
