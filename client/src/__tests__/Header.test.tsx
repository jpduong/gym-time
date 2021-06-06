import { render, screen } from "@testing-library/react";
import { Header } from "components/shared/Header";

const mockProps = {
  heading: "this is my header",
};

beforeEach(() => {
  render(<Header {...mockProps} />);
});

describe("Header", () => {
  it("should render", () => {
    expect(screen.getByTitle("component-header")).toBeDefined();
  });

  describe("props", () => {
    it("heading should be defined", () => {
      expect(screen.getByText(mockProps.heading)).toBeDefined();
    });
  });
});
