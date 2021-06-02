import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
