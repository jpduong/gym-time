import { render, screen } from "@testing-library/react";
import { RegisterPage } from "components/pages/Register";
import { MockedProvider } from "@apollo/client/testing";

beforeEach(() => {
  render(
    <MockedProvider>
      <RegisterPage />
    </MockedProvider>
  );
});

describe("RegisterPage", () => {
  it("should render", () => {
    expect(screen.getByTitle("component-sign-up-page")).toBeTruthy();
  });
});
