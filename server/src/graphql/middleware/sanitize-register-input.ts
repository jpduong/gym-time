import { MiddlewareFn } from "type-graphql";
import { RegisterInput } from "../types/user/user-input";
import {
  removeDoubleSpaces,
  removeLeadingTrailingSpaces,
} from "../../utils/sanitize-input";

export const SanitizeRegisterInput: MiddlewareFn<{
  data: { input: RegisterInput };
}> = async (data, next) => {
  const sanitizedFirstName = removeLeadingTrailingSpaces(
    data.args.input.fullName
  );
  const sanitizedEmail = removeDoubleSpaces(
    removeLeadingTrailingSpaces(data.args.input.email)
  );

  data.args.input.email = sanitizedEmail;
  data.args.input.sanitizedFirstName = sanitizedFirstName;

  return await next();
};
