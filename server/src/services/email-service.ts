import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { pick } from "lodash";
import sgMail from "@sendgrid/mail";
import { CONFIG } from "../config";
import { createEmailVerificationTemplate } from "../email-templates/email-verification";

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

export class EmailService {
  async sendEmail(user: User) {
    jwt.sign(
      {
        user: pick(user, "_id"),
      },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      },
      (ex, emailToken) => {
        console.log("EXCEPTION - sendEmail jwt sign", ex);
        const url = `${CONFIG.API_URL}/confirmation/${emailToken}`;
        sgMail
          .send(createEmailVerificationTemplate(user.email, url))
          .catch((ex) =>
            console.log("EXCEPTION - SendGrid sendEmail", ex.message)
          );
      }
    );
  }
}
