import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import WelcomePage from "./Page/WelcomePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={WelcomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
