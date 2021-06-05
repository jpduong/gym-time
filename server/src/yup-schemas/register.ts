import * as yup from "yup";
import { EMAIL, FULL_NAME, PASSWORD } from "../config/validation";
import { requiredText } from "../constants/input-validation";
import { removeDoubleSpaces } from "../utils/sanitize-input";
import { createMaxText } from "../utils/validation-text-creater";

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
});
