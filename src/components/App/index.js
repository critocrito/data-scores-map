import React from "react";
import "./index.css";
import DataNav from "../DataNav";
import DataView from "../DataView";

const app = () => (
  <div className="App">
    <DataNav />
    <article>
      <DataView />
    </article>
  </div>
);

export default app;
