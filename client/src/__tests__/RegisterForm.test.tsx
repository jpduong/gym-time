import { render, screen } from "@testing-library/react";
import { RegisterForm } from "components/forms/Register";

beforeEach(() => {
  render(<RegisterForm />);
});

describe("RegisterForm render", () => {
  it("component", () => {
    expect(screen.getByTitle("component-register-form")).toBeTruthy();
  });
});
