import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import { pick } from "lodash";
import mg from "mailgun-js";
import { CONFIG } from "../config/app";
import { createEmailVerificationTemplate } from "../email-templates/email-verification";
import { User, UserModel } from "../graphql/entities/User";
import { EmailPayload } from "../types/email-payload";
import { JWTPayload } from "../types/jwt-payload";

const mailgun = mg({
  apiKey: process.env.MAIL_GUN_API_KEY,
  domain: process.env.MAIL_GUN_DOMAIN,
});

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const updateUserEmailStatus = async (user: User) => {
  return await UserModel.updateOne(
    { _id: user._id },
    { isVerificationEmailSent: true }
  );
};

export class EmailService {
  private async sendEmailWithBackup(emailData: EmailPayload, user: User) {
    mailgun.messages().send(emailData, function (ex, body) {
      if (ex) {
        console.log("EXCEPTION - mailgun sendEmail", ex);
      }

      if (body) {
        return updateUserEmailStatus(user);
      }
    });
  }

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

        sgMail
          .send(emailData)
          .then(() => updateUserEmailStatus(user))
          .catch((ex) => {
            console.log("EXCEPTION - SendGrid sendEmail", ex);

            return this.sendEmailWithBackup(emailData, user);
          });
      }
    );
  }
}
