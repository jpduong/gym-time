import { render, screen } from "@testing-library/react";
import { SignUpForm } from "components/forms/SignUp";

beforeEach(() => {
  render(<SignUpForm />);
});

describe("SignUpForm render", () => {
  it("component", () => {
    expect(screen.getByTitle("component-signup-form")).toBeTruthy();
  });
});
