import mongoose from "mongoose";
import { CONFIG } from "../config/app";

mongoose.Promise = global.Promise;

export const connectMongoDB = async (isTestDB: boolean) => {
  const dbName = isTestDB
    ? `${CONFIG.MONGO_DB_NAME}-test`
    : `${CONFIG.MONGO_DB_NAME}-dev`;

  try {
    await mongoose.connect(CONFIG.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName,
    });

    console.log(`Connected to ${CONFIG.MONGO_URL}/${dbName}`);
  } catch (ex) {
    console.log("EXCEPTION - connectMongoDB", ex);
  }
};
