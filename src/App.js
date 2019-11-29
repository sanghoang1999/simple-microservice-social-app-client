import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import home from "./component/pages/Home";
import login from "./component/pages/Login";
import signup from "./component/pages/Signup";
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
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/home" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
};
export default App;
