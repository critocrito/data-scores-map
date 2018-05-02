import React from "react";
import ReactDOM from "react-dom";
import "./client.css";
import "../public/favicon.ico";
import App from "./components/App";
import log from "./lib/logging";

ReactDOM.render(<App />, document.getElementById("root"));

log.info("Client started.");
