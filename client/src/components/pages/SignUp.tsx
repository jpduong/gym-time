import { SignUpForm } from "components/forms/SignUp";
import { Header } from "components/shared/Header";
import React from "react";

export const SignUpPage = () => {
  return (
    <>
      <Header heading="It's free. Only a minute to complete" />
      <SignUpForm />
    </>
  );
};
