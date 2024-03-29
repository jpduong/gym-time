import express from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config/app";
import { User, UserModel } from "../graphql/entities/User";
import { JWTPayload } from "../types/jwt-payload";

const routes = express.Router();

routes.get("/confirmation/:token", async (req, res) => {
  try {
    const {
      user: { _id },
    } = jwt.verify(req.params.token, process.env.EMAIL_SECRET) as JWTPayload;

    await UserModel.updateOne({ _id }, { isEmailVerified: true });
  } catch (ex) {
    console.log("EXCEPTION - /confirmation/:token GET", ex);
    return res.send("error");
  }

  return res.redirect(`${CONFIG.CLIENT_URL}/verified`);
});

export default routes;
