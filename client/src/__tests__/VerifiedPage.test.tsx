import { render, screen } from "@testing-library/react";
import { VerifiedPage } from "components/pages/Verified";

beforeEach(() => {
  render(<VerifiedPage />);
});

describe("VerifiedPage", () => {
  it("renders", () => {
    expect(screen.getByTitle("component-verified-page")).toBeDefined();
  });
});
