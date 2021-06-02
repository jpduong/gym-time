import sgMail from "@sendgrid/mail";

export const createEmailVerificationTemplate = (
  to: string,
  link: string
): sgMail.MailDataRequired | sgMail.MailDataRequired[] => {
  const message = `Please click the link to verify your email  <a href="${link}">${link}</a>`;

  return {
    to,
    from: process.env.SEND_GRID_FROM_EMAIL,
    subject: "Email Verification Required",
    text: message,
    html: message,
  };
};