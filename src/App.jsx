import Services from "./services";
import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Route,
  Layout,
  Switch,
} from "react-router-dom";

import Login from "./components/pages/Login.jsx";
import AddPeople from "./components/pages/AddPeople.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import UserHome from "./components/pages/UserHome.jsx";

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={UserHome}/>
      <Route exact path="/add-people" component={AddPeople}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);
