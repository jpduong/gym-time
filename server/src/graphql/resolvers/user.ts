import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User, UserModel } from "../entities/User";
import { SanitizeRegisterInput } from "../middleware/sanitize-register-input";
import { EmailService } from "../../services/email";
import { validateRegister } from "../../utils/validate-register";
import { RegisterInput } from "../types/user/user-input";
import { RegisterResponse } from "../types/user/user-response";
import argon2 from "argon2";

const EmailServiceInstance = new EmailService();

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await UserModel.find();
  }

  @Mutation(() => RegisterResponse)
  @UseMiddleware(SanitizeRegisterInput)
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

    const user = await UserModel.create({
      ...registerInput,
      password: hashedPassword,
    });

    EmailServiceInstance.sendEmail(user);

    return {
      user,
    };
  }
}
