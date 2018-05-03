import React from "react";
import "./index.css";
import SidePanel from "../SidePanel";
import Map from "../Map";
import DataView from "../DataView";
import Counter from "../Counter";

const app = () => (
  <div className="App">
    <article className="flex">
      <div className="w-third">
        <SidePanel />
      </div>
      <div className="w-two-thirds">
        <Map />
      </div>
    </article>
    <article>
      <DataView />
    </article>
    <Counter />
  </div>
);

export default app;
