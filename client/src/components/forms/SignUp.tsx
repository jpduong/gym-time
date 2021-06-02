import { Container } from "@material-ui/core";
import { CustomTextField } from "components/inputs/CustomTextField";
import { CustomButton } from "components/shared/CustomButton";
import { ServerResponseTypography } from "components/typography/ServerResponseTypography";
import { SUCCESSFUL_REGISTRATION_MESSAGE } from "../../constants";
import { Form, Formik } from "formik";
import { omit } from "lodash";
import React, { useState } from "react";
import { ServerResponse } from "types/custom";
import { useRegisterMutation } from "types/generated";
import { hasPasswordString } from "utils";
import { SignUpSchema } from "validation-schemas/sign-up";

// const initialValues = {
//   fullName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

const initialValues = {
  fullName: "james",
  email: "james.duong93@gmail.com",
  password: "password",
  confirmPassword: "password",
};

const fieldNames = Object.keys(initialValues);

export const SignUpForm = () => {
  const [serverResponse, setServerResponse] = useState<ServerResponse>();
  const [register, { data, error, loading }] = useRegisterMutation({
    onCompleted: (data) => {
      if (data.register.error) {
        return setServerResponse({
          message: data.register.error.message,
          isError: true,
        });
      }

      if (data.register.user) {
        return setServerResponse({
          message: SUCCESSFUL_REGISTRATION_MESSAGE,
          isError: false,
        });
      }
    },
  });
  console.log("error", error);
  console.log("data", data);

  return (
    <Container maxWidth="xs">
      <Formik
        initialValues={initialValues}
        onSubmit={(data, { setSubmitting }) => {
          const registerInput = omit(data, ["confirmPassword"]);
          register({ variables: { userInput: registerInput } });
        }}
        validationSchema={SignUpSchema}
      >
        {({ values, errors, isSubmitting }) => (
          <Form title="component-signup-form">
            {fieldNames.map((name, i) => (
              <CustomTextField
                name={name}
                key={i}
                {...(hasPasswordString(name) && { type: "password" })}
              />
            ))}
            <CustomButton text="Sign Up" type="submit" isLoading={loading} />
            {serverResponse && (
              <ServerResponseTypography serverResponse={serverResponse} />
            )}
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
