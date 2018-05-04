import React from "react";
import "./index.css";
import DataNav from "../DataNav";
import DataView from "../DataView";
import Counter from "../Counter";

const app = () => (
  <div className="App">
    <DataNav />
    <article>
      <DataView />
    </article>
    <Counter />
  </div>
);

export default app;
