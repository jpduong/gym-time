import { render, screen } from "@testing-library/react";
import { RegisterPage } from "components/pages/Register";

beforeEach(() => {
  render(<RegisterPage />);
});

describe("RegisterPage render", () => {
  it("component", () => {
    expect(screen.getByTitle("component-sign-up-page")).toBeTruthy();
  });
});
