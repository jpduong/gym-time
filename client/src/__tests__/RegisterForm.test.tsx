import { MockedProvider } from "@apollo/client/testing";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { fieldNames, RegisterForm } from "components/forms/Register";
import { requiredText } from "constants/validation-texts";

beforeEach(() => {
  render(
    <MockedProvider>
      <RegisterForm />
    </MockedProvider>
  );
});

describe("RegisterForm", () => {
  it("should render", () => {
    expect(screen.getByTitle("component-register-form")).toBeTruthy();
  });

  it("button should render", () => {
    expect(screen.getByTitle("component-custom-button")).toBeTruthy();
  });

  it("register click with empty inputs should display required state for all textfields", async () => {
    await act(async () => {
      fireEvent.click(screen.getByTitle("component-custom-button"));
    });

    expect(screen.getAllByText(requiredText).length).toBe(fieldNames.length);
  });
});
