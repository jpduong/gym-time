import { render, screen } from "@testing-library/react";
import { SignUpPage } from "components/pages/SignUp";

beforeEach(() => {
  render(<SignUpPage />);
});

describe("SignUpPage render", () => {
  it("component", () => {
    expect(screen.getByTitle("component-sign-up-page")).toBeTruthy();
  });
});
