import * as yup from "yup";
import { MAX } from "../config/validation";
import { FieldError } from "../resolvers/types/shared/field-error";
import { RegisterInput } from "../resolvers/types/user/user-input";
import { requiredText } from "./required-text";

const fullNameRegex = /^[a-zA-Z ]+$/;

const isLettersAndSpaces = (value: string | undefined) =>
  value ? fullNameRegex.test(value) : false;

export const RegisterSchema = yup.object({
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
});

export const validateRegister = async (input: RegisterInput) => {
  const errors: FieldError[] = [];

  try {
    await RegisterSchema.validate(input, {
      abortEarly: false,
    });
  } catch (ex) {
    ex.inner.forEach(({ path, message }: { path: string; message: string }) =>
      errors.push({ field: path, message: message })
    );
  }

  return errors;
};
