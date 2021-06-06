import { RegisterForm } from "components/forms/Register";
import { Header } from "components/shared/Header";
import { PageContainer } from "components/shared/PageContainer";
import React from "react";

export const RegisterPage = () => {
  return (
    <PageContainer title="component-sign-up-page">
      <Header heading="It's free. Only a minute to complete" />
      <RegisterForm />
    </PageContainer>
  );
};
