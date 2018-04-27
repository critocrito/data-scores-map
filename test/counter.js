import test from "ava";
import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Counter from "../src/components/Counter";
import Button from "../src/components/Button";

configure({adapter: new Adapter()});

test("<Counter /> renders two buttons", t => {
  const wrapper = shallow(<Counter />);
  t.is(wrapper.find(Button).length, 2);
});

test("<Counter /> has a counter of 0 when rendered", t => {
  const wrapper = shallow(<Counter />);
  t.is(wrapper.state().counter, 0);
});
