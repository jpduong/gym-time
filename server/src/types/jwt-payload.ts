import { ObjectId } from "bson";

export interface JWTPayload {
  user: {
    _id: ObjectId;
  };
}
