import Services from "./services";
import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Route,
  Layout,
  Switch,
} from "react-router-dom";

import Login from "./components/Login.jsx";
import AddPeople from "./components/AddPeople.jsx";
import NotFound from "./components/NotFound.jsx";
import UserHome from "./components/UserHome.jsx";

export default (
  <Router>
    <Switch>
      <Route exact path="/home" component={UserHome}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/add-people" component={AddPeople}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);
