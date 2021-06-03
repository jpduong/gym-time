import { MiddlewareFn } from "type-graphql";

export const EmailToLowerCase: MiddlewareFn = async (data, next) => {
  data.args.input.email = data.args.input.email.toLowerCase();

  return await next();
};
