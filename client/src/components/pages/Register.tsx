import { RegisterForm } from "components/forms/Register";
import { Header } from "components/shared/Header";
import React from "react";

export const RegisterPage = () => {
  return (
    <>
      <Header heading="It's free. Only a minute to complete" />
      <RegisterForm />
    </>
  );
};
