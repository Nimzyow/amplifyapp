import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello from V2! What's special about this?</h1>
        <h2>This is hosted on AWS. Yay!</h2>
      </header>
    </div>
  );
}

export default App;
