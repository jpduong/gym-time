import { connectMongoDB } from "../utils/connect-mongo";
import { clearDatabase, closeDatabase } from "./clean-up";

export const setUpTestingDB = () => {
  beforeAll(async () => await connectMongoDB(true));

  // Cleans up database between each test
  afterEach(async () => {
    await clearDatabase();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await closeDatabase();
  });
};
