import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { pick } from "lodash";
import sgMail from "@sendgrid/mail";
import { CONFIG } from "../config";

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

export class EmailService {
  async sendEmail(user: User) {
    try {
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

          const msg = {
            to: "james.duong93@gmail.com",
            from: "james.duong93@gmail.com", // Use the email address or domain you verified above
            subject: "Sending with Twilio SendGrid is Fun",
            text: `Please click this link to confirm your email: ${url}`,
            html: `Please click this link to confirm your email: ${url}`,
          };

          sgMail.send(msg);
        }
      );
    } catch (ex) {
      console.log("EXCEPTION - sendEmail", ex.message);
    }
  }
}
