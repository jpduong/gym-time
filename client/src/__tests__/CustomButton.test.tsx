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
  it("component should render", () => {
    expect(screen.getByTitle("component-custom-button")).toBeTruthy();
  });

  it("child loader component should not render on not loading state", () => {
    expect(() => screen.getByTitle("component-custom-button-loader")).toThrow();
  });

  it("child loader component should render on button loading state", () => {
    render(<CustomButton {...mockProps} isLoading />);
    expect(screen.getByTitle("component-custom-button-loader")).toBeDefined();
  });

  describe("props", () => {
    it("text should be defined", () => {
      expect(screen.getByText(mockProps.text)).toBeDefined();
    });
  });
});
