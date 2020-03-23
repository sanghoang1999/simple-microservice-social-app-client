import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Alert from "./component/layout/AlertMessage";
import home from "./component/pages/Home";
import user from "./component/pages/User";
import login from "./component/pages/Login";
import signup from "./component/pages/Signup";
import profile from "./component/Profile/Profile";
import Navbar from "./component/layout/Navbar";
import themeStyle from "./utils/theme";

import { loadUser } from "./actions/auth";
//redux

import { Provider } from "react-redux";
import store from "./store";

import setAuthToken from "./utils/setAuthToken";
const theme = createMuiTheme(themeStyle);

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <Alert />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/home" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/profile" component={profile} />
                <Route exact path="/user/:handle" component={user} />
                <Route
                  exact
                  path="/user/:handle/scream/:screamId"
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
};
export default App;
