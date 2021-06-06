import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../scalars/object-id";

@ObjectType()
export class User {
  @Field(() => ObjectIdScalar)
  readonly _id: ObjectId;

  @Field()
  @prop({
    required: true,
  })
  email: string;

  @Field()
  @prop({
    required: true,
  })
  fullName: string;

  @prop({ required: true })
  password: string;

  @Field()
  @prop({ required: true, default: false })
  isEmailVerified?: boolean;

  @Field()
  @prop({ required: true, default: false })
  isVerificationEmailSent?: boolean;
}

export const UserModel = getModelForClass(User);
