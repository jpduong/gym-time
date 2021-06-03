import { RegisteredPage } from "components/pages/Registered";
import { PATHS } from "constants/paths";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignUpPage } from "../pages/SignUp";
import { VerifiedPage } from "../pages/Verified";
import { AppContainer } from "./Container";

export const App = () => {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route exact path={PATHS.HOME}>
            <SignUpPage />
          </Route>
          <Route exact path={PATHS.REGISTERED}>
            <RegisteredPage />
          </Route>
          <Route exact path={PATHS.VERIFIED}>
            <VerifiedPage />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  );
};
