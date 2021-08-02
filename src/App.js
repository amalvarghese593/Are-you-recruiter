import "./App.css";
import React from "react";
import { Page } from "./components/Page";
import { PageLatest } from "./components/PageLatest";

function App() {
  return (
    <div className="App">
      <PageLatest />
      {/* <Page /> */}
    </div>
  );
}

export default App;
