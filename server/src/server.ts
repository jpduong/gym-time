require("dotenv").config();
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import jwt from "jsonwebtoken";
import { UserModel } from "./entities/User";
import { CONFIG } from "./config";
import { JWTPayload } from "./types/jwt-payload";

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

    const app = Express();

    app.get("/confirmation/:token", async (req, res) => {
      try {
        const {
          user: { _id },
        } = jwt.verify(
          req.params.token,
          process.env.EMAIL_SECRET
        ) as JWTPayload;
        await UserModel.update({ isEmailValidated: true }, { where: { _id } });
      } catch (e) {
        res.send("error");
      }

      return res.redirect(`${CONFIG.CLIENT_URL}/verified`);
    });
    apolloServer.applyMiddleware({ app });

    app.listen(CONFIG.PORT, () => {
      console.log(`server started on ${CONFIG.API_URL}/graphql`);
    });
  } catch (ex) {
    console.log("main EXCEPTION", ex);
  }
};

main();
