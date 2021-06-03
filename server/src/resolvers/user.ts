import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User, UserModel } from "../entities/User";
import { EmailToLowerCase } from "../middleware/email-input-to-lowercase";
import { EmailService } from "../services/email-service";
import { validateRegister } from "../utils/validate-register";
import { RegisterInput } from "./types/user/user-input";
import { RegisterResponse } from "./types/user/user-response";
import argon2 from "argon2";

const EmailServiceInstance = new EmailService();

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await UserModel.find();
  }

  @Mutation(() => RegisterResponse)
  @UseMiddleware(EmailToLowerCase)
  async register(
    @Arg("input") registerInput: RegisterInput
  ): Promise<RegisterResponse> {
    const errors = await validateRegister(registerInput);

    if (errors.length) {
      return {
        errors,
      };
    }

    const hashedPassword = await argon2.hash(registerInput.password);

    try {
      const user = await UserModel.create({
        ...registerInput,
        password: hashedPassword,
      });

      EmailServiceInstance.sendEmail(user);

      return {
        user,
      };
    } catch (ex) {
      if (ex.message.indexOf("11000") != -1) {
        return {
          errors: [{ field: "email", message: "this email exists already" }],
        };
      }
    }
  }
}
