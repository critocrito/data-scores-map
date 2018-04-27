import test from "ava";
import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Button from "../src/components/Button";

configure({adapter: new Adapter()});

test("shallow", t => {
  const wrapper = shallow(<Button />);
  t.is(wrapper.find("button").length, 1);
  t.is(wrapper.text(), "Submit");
});
