import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import { pick } from "lodash";
import mg from "mailgun-js";
import { CONFIG } from "../config/app";
import { createEmailVerificationTemplate } from "../email-templates/email-verification";
import { User, UserModel } from "../graphql/entities/User";
import { JWTPayload } from "../types/jwt-payload";

const mailgun = mg({
  apiKey: process.env.MAIL_GUN_API_KEY,
  domain: process.env.MAIL_GUN_DOMAIN,
});

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

export class EmailService {
  async sendEmail(user: User) {
    jwt.sign(
      {
        user: pick(user, "_id"),
      } as JWTPayload,
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      },
      (ex, emailToken) => {
        if (ex) {
          console.log("EXCEPTION - sendEmail jwt sign", ex);
        }

        const url = `${CONFIG.API_URL}/confirmation/${emailToken}`;
        const emailData = createEmailVerificationTemplate(user.email, url);

        const updateUserEmailStatus = async () =>
          await UserModel.updateOne(
            { _id: user._id },
            { isVerificationEmailSent: true }
          );

        sgMail
          .send(emailData)
          .then(() => updateUserEmailStatus())
          .catch((ex) => {
            console.log("EXCEPTION - SendGrid sendEmail", ex);

            mailgun.messages().send(emailData, function (ex, body) {
              if (ex) {
                console.log("EXCEPTION - mailgun sendEmail", ex);
              }

              if (body) {
                updateUserEmailStatus();
              }
            });
          });
      }
    );
  }
}
