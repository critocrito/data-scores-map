import React from "react";

import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";

import Button from "../src/components/Button";

const click = event => action("clicked")(event);

storiesOf("Button", module)
  .add("with text", () => <Button label="Hahaha" onButtonClick={click} />)
  .add("with default label", () => <Button onButtonClick={click} />)
  .add("with default handler", () => <Button />);
