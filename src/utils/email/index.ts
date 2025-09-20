import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export const sendEmail = async (mailOptions: MailOptions) => {
  // step:1 // create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

    tls: {
      rejectUnauthorized: false,
    },
  });
  mailOptions.from = process.env.EMAIL_USER ;
  // step:2 // send email
  await transporter.sendMail(mailOptions);
};
