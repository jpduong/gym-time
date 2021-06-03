import { render, screen } from "@testing-library/react";
import { RegisterHeader } from "components/pages/Register/Header";

beforeEach(() => {
  render(<RegisterHeader />);
});

describe("RegisterHeader render", () => {
  it("component", () => {
    expect(screen.getByTitle("component-sign-up-header")).toBeTruthy();
  });
});
