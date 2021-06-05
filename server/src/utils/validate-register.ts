import { FieldError } from "../resolvers/types/shared/field-error";
import { RegisterInput } from "../resolvers/types/user/user-input";
import { RegisterSchema } from "../yup-schemas/register";

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
