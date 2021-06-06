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
import { RegisterSchema } from "validation-schemas/register";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const fieldNames = Object.keys(initialValues);

export const RegisterForm = () => {
  const [register, { loading }] = useRegisterMutation({
    onError: (ex) => console.log("EXCEPTION - register", ex),
  });
  const history = useHistory();

  return (
    <Container maxWidth="xs" title="component-register-form">
      <Formik
        initialValues={initialValues}
        onSubmit={async (data, { setErrors }) => {
          const input = omit(data, ["confirmPassword"]);
          const response = await register({ variables: { input } });

          if (response.data?.register?.errors) {
            return setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register?.user) {
            return history.push(PATHS.REGISTERED);
          }
        }}
        validationSchema={RegisterSchema}
      >
        {({ values, errors }) => (
          <Form>
            {fieldNames.map((name, i) => (
              <CustomTextField
                name={name}
                key={i}
                {...(hasPasswordString(name) && { type: "password" })}
                title={`component-custom-textfield-${name}`}
              />
            ))}
            <CustomButton text="Sign Up" type="submit" isLoading={loading} />
          </Form>
        )}
      </Formik>
    </Container>
  );
};
