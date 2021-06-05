import * as yup from "yup";
import { MAX, requiredText } from "../constants/input-validation";
import { createMaxText } from "../utils/validation-text-creater";

export const RegisterSchema = yup.object({
  fullName: yup
    .string()
    .required(requiredText)
    .max(MAX.FULL_NAME_LENGTH, createMaxText(MAX.FULL_NAME_LENGTH)),
  email: yup
    .string()
    .email()
    .required(requiredText)
    .max(MAX.EMAIL_LENGTH, createMaxText(MAX.EMAIL_LENGTH)),
  password: yup
    .string()
    .required(requiredText)
    .max(MAX.PASSWORD_LENGTH, createMaxText(MAX.PASSWORD_LENGTH)),
});
