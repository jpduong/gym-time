import { ObjectId } from "bson";
import { User } from "../entities/User";

export interface JWTPayload {
  user: {
    _id: ObjectId;
  };
}
