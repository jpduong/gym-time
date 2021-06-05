import { render, screen } from "@testing-library/react";
import { RegisteredPage } from "components/pages/Registered";

beforeEach(() => {
  render(<RegisteredPage />);
});

describe("RegisteredPage", () => {
  it("renders", () => {
    expect(screen.getByTitle("component-registered-page")).toBeDefined();
  });
});
