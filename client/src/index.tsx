import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core";
import { App } from "components/App";
import { apolloClient } from "config/apollo";
import { muiTheme } from "config/mui";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={muiTheme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
