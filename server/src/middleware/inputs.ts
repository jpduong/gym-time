import { MiddlewareFn } from "type-graphql";
import argon2 from "argon2";

export const ToLowerCase: MiddlewareFn = async (data, next) => {
  data.args.userInput.email = data.args.userInput.email.toLowerCase();

  return await next();
};

export const HashPassword: MiddlewareFn = async (data, next) => {
  data.args.userInput.password = await argon2.hash(
    data.args.userInput.password
  );

  return await next();
};
