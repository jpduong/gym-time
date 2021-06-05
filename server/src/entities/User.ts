import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../scalars/object-id";

@index({ email: 1 }, { unique: true, collation: { locale: "en", strength: 2 } })
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
  isEmailValidated?: boolean;
}

export const UserModel = getModelForClass(User);

UserModel.createIndexes();
