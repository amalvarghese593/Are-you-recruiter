import "./App.css";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { PageLatest } from "./components/PageLatest";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/recruiter-page">
          <PageLatest />
        </Route>
        <Route path="/" exact>
          <Redirect to="/recruiter-page" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
