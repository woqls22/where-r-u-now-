import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import RoomPage from "./Page/RoomPage";
import WelcomePage from "./Page/WelcomePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app_body">
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/rooms/:id" component={RoomPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
