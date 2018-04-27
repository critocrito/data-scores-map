// @flow
import * as React from "react";

type Props = {
  label: string,
  onButtonClick: any => void,
};

class Button extends React.Component<Props> {
  static defaultProps = {
    label: "Submit",
    onButtonClick: (event: SyntheticEvent<HTMLButtonElement>) =>
      // eslint-disable-next-line no-console
      console.log(event),
  };

  _handleClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
    this.props.onButtonClick(event);
  };

  render() {
    return <button onClick={this._handleClick}>{this.props.label}</button>;
  }
}

export default Button;
