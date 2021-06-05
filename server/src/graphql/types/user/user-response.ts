import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/User";
import { FieldError } from "../shared/field-error";

@ObjectType()
export class RegisterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
