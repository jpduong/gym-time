import { Header } from "components/shared/Header";
import { PageContainer } from "components/shared/PageContainer";
import React from "react";

export const RegisteredPage = () => {
  return (
    <PageContainer title="component-registered-page">
      <Header
        heading="Registered! You wil receive an email shortly to verify your account."
        color="green"
      />
    </PageContainer>
  );
};
