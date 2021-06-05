import { Container } from "@material-ui/core";
import { RegisterForm } from "components/forms/Register";
import { Header } from "components/shared/Header";
import React from "react";

export const RegisterPage = () => {
  return (
    <Container title="component-sign-up-page">
      <Header heading="It's free. Only a minute to complete" />
      <RegisterForm />
    </Container>
  );
};
