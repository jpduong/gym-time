import { Header } from "components/shared/Header";
import { PageContainer } from "components/shared/PageContainer";
import React from "react";

export const VerifiedPage = () => {
  return (
    <PageContainer title="component-verified-page">
      <Header heading="Successfully verified!" color="green" />
    </PageContainer>
  );
};
