import { getModelForClass, prop } from "@typegoose/typegoose";
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
    //  unique: true // tofix
  })
  email: string;

  @prop({ required: true })
  password: string;

  @Field()
  @prop({ required: true, default: false })
  isEmailValidated?: boolean;
}

export const UserModel = getModelForClass(User);
