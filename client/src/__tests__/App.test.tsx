import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { App } from "components/App";

beforeEach(() => {
  render(
    <MockedProvider>
      <App />
    </MockedProvider>
  );
});

describe("App", () => {
  it("should render", () => {
    expect(screen.getByTitle("component-app")).toBeDefined();
  });
});
