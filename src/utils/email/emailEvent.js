import { EventEmitter } from "events";
import sendEmail, { subject } from "./sendemail.js";
import { signup } from "./html.template.js";
import { generatetoken } from "../token/token.js";
const emailEmitter = new EventEmitter();

emailEmitter.on("sendEmail", async (email, userName) => {
  const token = generatetoken({
    payload: { email },
    signature: process.env.TOKEN_SECRET_EMAIL,
  });
  const link = `http://localhost:3000/auth/activate_account/${token}`;
  const issent = await sendEmail({
    to: email,
    subject: subject.register,
    html: signup(userName, link),
  });
});
export default emailEmitter;
