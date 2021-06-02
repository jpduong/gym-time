import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignUpPage } from "../pages/SignUp";
import { SuccessPage } from "../pages/Success";
import { AppContainer } from "./Container";

export const App = () => {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route exact path="/">
            <SignUpPage />
          </Route>
          <Route exact path="/success">
            <SuccessPage />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  );
};
