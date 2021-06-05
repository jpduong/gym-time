import { UserModel } from "../graphql/entities/User";
import { FieldError } from "../graphql/types/shared/field-error";
import { RegisterInput } from "../graphql/types/user/user-input";
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

  const isExistingEmail = await UserModel.findOne({ email: input.email });

  if (isExistingEmail) {
    errors.push({ field: "email", message: "This email exists already" });
  }

  return errors;
};
