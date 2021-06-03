import { MAX } from "config/validation";
import { requiredText } from "utils/required-text";
import * as yup from "yup";

const fullNameRegex = /^[a-zA-Z ]+$/;

const isLettersAndSpaces = (value: string | undefined) =>
  value ? fullNameRegex.test(value) : false;

export const SignUpSchema = yup.object({
  fullName: yup
    .string()
    .test(
      "isLettersAndSpaces",
      "Full name can only contain letters and spaces",
      isLettersAndSpaces
    )
    .required(requiredText("full name"))
    .max(MAX.FULL_NAME_LENGTH),
  email: yup
    .string()
    .email()
    .required(requiredText("email"))
    .max(MAX.EMAIL_LENGTH),
  password: yup
    .string()
    .required(requiredText("password"))
    .max(MAX.PASSWORD_LENGTH),
  confirmPassword: yup
    .string()
    .required(requiredText("confirm password"))
    .max(MAX.PASSWORD_LENGTH)
    .when("password", {
      is: (val: string) => val && val.length > 0,
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both passwords need to match"),
    }),
});
