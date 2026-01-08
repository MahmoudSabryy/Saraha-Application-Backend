import mongoose, { Schema } from "mongoose";
import { roletypes } from "../../middlewares/auth.middleware.js";
export const gendertypes = {
  male: "male",
  female: "female",
};
const userschema = new Schema(
  {
    userName: {
      type: String,
      minLength: [3, "username must be at least 3 charchters"],
      maxLength: [20, "username must be less than 20 charchters"],
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      lowercase: true,
      trim: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    gender: {
      type: String,
      enum: Object.values(gendertypes),
      message: "Gender must be either male or female",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(roletypes),
    },
    DOB: String,
    address: String,
    phone: String,
    image: String,
    changedAT: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", userschema);
export default UserModel;
