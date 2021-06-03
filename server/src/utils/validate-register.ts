import { RegisterInput } from "../resolvers/types/user/user-input";

export const validateRegister = (input: RegisterInput) => {
  const errors = [];

  if (input.fullName.length <= 2) {
    errors.push({
      field: "full name",
      message: "length must be greater than 1",
    });
  }

  if (!input.email.includes("@")) {
    errors.push({
      field: "email",
      message: "invalid email",
    });
  }

  if (input.password.length <= 2) {
    errors.push({
      field: "password",
      message: "length must be greater than 1",
    });
  }

  return errors;
};
