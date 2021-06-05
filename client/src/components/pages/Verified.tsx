import { Container } from "@material-ui/core";
import { Header } from "components/shared/Header";
import React from "react";

export const VerifiedPage = () => {
  return (
    <Container title="component-verified-page">
      <Header heading="Successfully verified!" color="green" />
    </Container>
  );
};
