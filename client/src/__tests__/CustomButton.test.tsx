import { render, screen } from "@testing-library/react";
import { CustomButton } from "components/shared/CustomButton";

const mockProps = {
  isLoading: false,
  text: "click me",
};

beforeEach(() => {
  render(<CustomButton {...mockProps} />);
});

describe("CustomButton", () => {
  it("component renders", () => {
    expect(screen.getByTitle("component-custom-button")).toBeTruthy();
  });

  it("child loader component does not render on not loading state", () => {
    expect(() => screen.getByTitle("component-custom-button-loader")).toThrow();
  });

  it("child loader component renders on button loading state", () => {
    render(<CustomButton {...mockProps} isLoading />);
    expect(screen.getByTitle("component-custom-button-loader")).toBeDefined();
  });

  describe("props", () => {
    it("text", () => {
      expect(screen.getByText(mockProps.text)).toBeDefined();
    });
  });
});
