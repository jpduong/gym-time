import { RegisterPage } from "components/pages/Register";
import { RegisteredPage } from "components/pages/Registered";
import { VerifiedPage } from "components/pages/Verified";
import { PATHS } from "constants/paths";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppContainer } from "./Container";

export const App = () => {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route exact path={PATHS.HOME}>
            <RegisterPage />
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
