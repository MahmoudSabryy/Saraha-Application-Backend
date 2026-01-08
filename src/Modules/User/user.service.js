import UserModel from "../../DB/Models/user.model.js";
import emailEmitter from "../../utils/email/emailEvent.js";
import { decrypt, encrypt } from "../../utils/encryption/encrypt.js";
import { compare, hash } from "../../utils/hashing/hash.js";

export const getprofile = async (req, res, next) => {
  try {
    const { user } = req;
    // Decrypt phone
    user.phone = decrypt({
      encrypted: user.phone,
      signature: process.env.ENCRYPTION_SECRET,
    });
    return res
      .status(200)
      .json({ success: true, message: "User Profile", results: user });
  } catch (error) {
    return next(error);
  }
};
export const updateProfile = async (req, res, next) => {
  if (req.body.phone) {
    req.body.phone = encrypt({
      palintext: req.body.phone,
      signature: process.env.ENCRYPTION_SECRET,
    });
  }
  if (req.body.email) {
    await UserModel.findByIdAndUpdate(
      req.user._id,
      { confirmEmail: false },
      { new: true },
      { runValidators: true }
    );
    emailEmitter.emit("sendEmail", req.body.email, req.body.userName);
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true },
    { runValidators: true }
  ).select("-_id -password -role -confirmEmail");

  return res.status(200).json({
    success: true,
    message: "profile updated",
    results: { user: updatedUser },
  });
};
export const changePassword = async (req, res, next) => {
  const { oldpassword, password } = req.body;
  const compareHash = compare({
    plainText: oldpassword,
    user_password: req.user.password,
  });
  if (!compareHash) return next(new Error("old password is incorrect"));
  const hashpassword = hash({ plainText: password });
  const updateuser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { password: hashpassword, changedAT: Date.now() },
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    success: true,
    message: "password updated Successfully",
    results: updateuser,
  });
};
export const deactivateAccount = async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      isDeleted: true,
      changedAT: Date.now(),
    },
    { new: true, runValidators: true }
  );
  return res.status(200).json({
    success: true,
    message: "Account Deactivated Successfully",
    results: user,
  });
};
