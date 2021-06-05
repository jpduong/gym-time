require("dotenv").config();
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import { CONFIG } from "./config";
import { UserResolver } from "./graphql/resolvers/user";
import routes from "./rest/routes";

const app = express();

app.use("/", routes);

const main = async () => {
  try {
    await mongoose.connect(CONFIG.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: CONFIG.MONGO_DB_NAME,
    });

    const schema = await buildSchema({
      resolvers: [UserResolver],
    });

    const apolloServer = new ApolloServer({ schema });

    apolloServer.applyMiddleware({ app });

    app.listen(CONFIG.PORT, () => {
      console.log(`server started on ${CONFIG.API_URL}/graphql`);
    });
  } catch (ex) {
    console.log("EXCEPTION - main", ex);
  }
};

main();
