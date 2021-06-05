import { MiddlewareFn } from "type-graphql";
import { removeDoubleSpaces } from "../../utils/sanitize-input";
import { RegisterInput } from "../types/user/user-input";

export const SanitizeRegisterInput: MiddlewareFn<{
  data: { input: RegisterInput };
}> = async (data, next) => {
  const sanitizedFullName = removeDoubleSpaces(data.args.input.fullName);
  const sanitizedEmail = data.args.input.email.trim();

  data.args.input.email = sanitizedEmail;
  data.args.input.fullName = sanitizedFullName;

  return await next();
};
