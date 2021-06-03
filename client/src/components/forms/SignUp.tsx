import { Container } from "@material-ui/core";
import { CustomTextField } from "components/inputs/CustomTextField";
import { CustomButton } from "components/shared/CustomButton";
import { PATHS } from "constants/paths";
import { Form, Formik } from "formik";
import { omit } from "lodash";
import React from "react";
import { useHistory } from "react-router";
import { useRegisterMutation } from "types/generated";
import { hasPasswordString } from "utils/has-password-string";
import { toErrorMap } from "utils/to-error-map";

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
  const [register, { loading }] = useRegisterMutation({});
  const history = useHistory();

  return (
    <Container maxWidth="xs">
      <Formik
        initialValues={initialValues}
        onSubmit={async (data, { setErrors }) => {
          const input = omit(data, ["confirmPassword"]);
          const response = await register({ variables: { input } });

          if (response.data?.register.errors) {
            return setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register?.user) {
            return history.push(PATHS.REGISTERED);
          }
        }}
        // validationSchema={SignUpSchema}
      >
        {({ values, errors }) => (
          <Form title="component-signup-form">
            {fieldNames.map((name, i) => (
              <CustomTextField
                name={name}
                key={i}
                {...(hasPasswordString(name) && { type: "password" })}
              />
            ))}
            <CustomButton text="Sign Up" type="submit" isLoading={loading} />
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
