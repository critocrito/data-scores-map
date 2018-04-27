import React from "react";
import {storiesOf} from "@storybook/react";

import Counter from "../src/components/Counter";

storiesOf("Counter", module).add("A regular counter", () => <Counter />);
