import UserModel from "../../DB/Models/user.model.js";
import { roletypes } from "../../middlewares/auth.middleware.js";
import emailEmitter from "../../utils/email/emailEvent.js";
import { compare, hash } from "../../utils/hashing/hash.js";
import { encrypt } from "../../utils/encryption/encrypt.js";
import { generatetoken, verifytoken } from "../../utils/token/token.js";

export const register = async (req, res, next) => {
  const { email, password, phone } = req.body;

  const usercheck = await UserModel.findOne({ email });
  if (usercheck) return next(new Error("user already exist", { cause: 400 }));
  const hashpassword = hash({ plainText: password });
  const encryptphone = encrypt({
    palintext: phone,
    signature: process.env.ENCRYPTION_SECRET,
  });
  const user = await UserModel.create({
    ...req.body,
    password: hashpassword,
    phone: encryptphone,
  });
  emailEmitter.emit("sendEmail", user.email, user.userName);
  return res
    .status(201)
    .json({ success: true, message: "User created successfully", user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  //check if user exist
  const user = await UserModel.findOne({ email });
  if (!user) return next(new Error("User Not Found", { cause: 400 }));

  //check if email confirmed
  if (user.confirmEmail == false)
    return next(new Error("please confirm your email", { cause: 400 }));

  //check if password match
  const match = compare({ plainText: password, user_password: user.password });
  if (!match) return next(new Error("Password does not match", { cause: 400 }));

  // Generate Token
  const token = generatetoken({
    payload: { id: user._id, isloggedin: true },
    signature:
      user.role === roletypes.User
        ? process.env.TOKEN_SECRET_USER
        : process.env.TOKEN_SECRET_ADMIN,
    options: { expiresIn: "1h" },
  });

  return res
    .status(200)
    .json({ success: true, message: "logn successfull", token: token });
};

export const activate_account = async (req, res, next) => {
  const { token } = req.params;
  const { email } = verifytoken({
    token: token,
    signature: process.env.TOKEN_SECRET_EMAIL,
  });
  const user = await UserModel.findOne({ email });
  if (!user) return next(new Error("User Not Found", { cause: 404 }));
  user.confirmEmail = true;
  await user.save();
  return res
    .status(200)
    .json({ success: true, message: "Email confirmed Successfully" });
};
