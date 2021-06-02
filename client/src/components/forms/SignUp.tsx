import { Button, Container } from "@material-ui/core";
import { CustomTextField } from "components/inputs/CustomTextField";
import { ServerResponseTypography } from "components/typography/ServerResponseTypography";
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
          message:
            "Successfully registered, please check your email inbox to verify",
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
            <Button
              type="submit"
              disabled={loading}
              variant="outlined"
              fullWidth
              size="large"
            >
              Sign Up
            </Button>
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
