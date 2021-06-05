import { Container } from "@material-ui/core";
import { Header } from "components/shared/Header";
import React from "react";

export const RegisteredPage = () => {
  return (
    <Container title="component-registered-page">
      <Header
        heading="Registered! You wil receive an email shortly to verify your account."
        color="green"
      />
    </Container>
  );
};
