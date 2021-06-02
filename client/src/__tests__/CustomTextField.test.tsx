import { render, screen } from "@testing-library/react";
import { CustomTextField } from "components/inputs/CustomTextField";
import { Formik } from "formik";
import React from "react";

const customTextFieldMockProps = {
  name: "test",
};

const formikMockProps = {
  onSubmit: () => {},
  initialValues: {},
};

beforeEach(() => {
  render(
    <Formik {...formikMockProps}>
      <CustomTextField {...customTextFieldMockProps} />
    </Formik>
  );
});

describe("CustomTextField render", () => {
  it("component", () => {
    expect(screen.getByTitle("component-custom-textfield")).toBeTruthy();
  });
});
