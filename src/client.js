import React from "react";
import ReactDOM from "react-dom";
import "./client.css";
import "../public/favicon.ico";
import App from "./components/App";
import log from "./lib/logging";

const initialize = async () => {
  const result = await fetch("http://localhost:4000/cities").then(resp =>
    resp.json(),
  );
  const cities = result.data.map(c =>
    Object.assign(c, {
      position: [c.lat, c.lng],
    }),
  );
  ReactDOM.render(<App cities={cities} />, document.getElementById("root"));
};

initialize();

log.info("Client started.");
