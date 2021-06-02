import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User, UserModel } from "../entities/User";
import { HashPassword, ToLowerCase } from "../middleware/inputs";
import { UserInput } from "./types/user/user-input";
import { RegisterResponse } from "./types/user/user-response";
import { EmailService } from "../services/email-service";

const EmailServiceInstance = new EmailService();

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await UserModel.find();

    return users;
  }

  @Mutation(() => RegisterResponse)
  @UseMiddleware(ToLowerCase, HashPassword)
  async register(
    @Arg("userInput") userInput: UserInput
  ): Promise<RegisterResponse> {
    try {
      const user = await UserModel.create({
        ...userInput,
      });
      await EmailServiceInstance.sendEmail(user);
      return {
        user,
      };
    } catch (ex) {
      if (ex.message.indexOf("11000") != -1) {
        return {
          error: { field: "username", message: "this email exists already" },
        };
      }
    }
  }
}
