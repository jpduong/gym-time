import { render, screen } from "@testing-library/react";
import { SignUpHeader } from "components/pages/SignUp/Header";

beforeEach(() => {
  render(<SignUpHeader />);
});

describe("SignUpHeader render", () => {
  it("component", () => {
    expect(screen.getByTitle("component-sign-up-header")).toBeTruthy();
  });
});
