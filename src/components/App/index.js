import React from "react";
import logo from "./logo.svg";
import "./index.css";
import Counter from "../Counter";

const app = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.jsx</code> and save to reload.
    </p>
    <Counter />
  </div>
);

export default app;
