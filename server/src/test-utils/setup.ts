import { connectMongoDB } from "../utils/connect-mongo";
import { clearDatabase, closeDatabase } from "./clean-up";

export const setUpTestingDB = () => {
  beforeAll(async () => await connectMongoDB(true));

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });
};
