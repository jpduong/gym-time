import { render, screen } from "@testing-library/react";
import { PageContainer } from "components/shared/PageContainer";

beforeEach(() => {
  render(
    <PageContainer>
      <div />
    </PageContainer>
  );
});

describe("PageContainer", () => {
  it("should render", () => {
    expect(screen.getByTitle("component-page-container")).toBeDefined();
  });
});
