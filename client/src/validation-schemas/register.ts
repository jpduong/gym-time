import { EMAIL, FULL_NAME, PASSWORD } from "config/validation";
import {
  confirmPasswordMismatch,
  requiredText,
} from "constants/validation-texts";
import { removeDoubleSpaces } from "utils/sanitize-input";
import { createMaxText } from "utils/validation-text-creater";
import * as yup from "yup";

export const RegisterSchema = yup.object({
  fullName: yup
    .string()
    .transform(removeDoubleSpaces)
    .required("Required")
    .max(FULL_NAME.MAX, createMaxText(FULL_NAME.MAX)),
  email: yup
    .string()
    .trim()
    .email()
    .required(requiredText)
    .max(EMAIL.MAX, createMaxText(EMAIL.MAX)),
  password: yup
    .string()
    .required(requiredText)
    .max(PASSWORD.MAX, createMaxText(PASSWORD.MAX)),
  confirmPassword: yup
    .string()
    .required(requiredText)
    .when("password", {
      is: (val: string) => val && val.length > 0,
      then: yup.string().oneOf([yup.ref("password")], confirmPasswordMismatch),
    }),
});
