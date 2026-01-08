import joi from "joi";
import { Types } from "mongoose";
import { roletypes } from "./auth.middleware.js";
import { gendertypes } from "../DB/Models/user.model.js";
export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const results = schema.validate(data, { abortEarly: false });
    if (results.error) {
      const errorMessages = results.error.details.map((obj) => obj.message);
      return next(new Error(errorMessages, { cause: 400 }));
    }
    return next();
  };
};
export const isValidObjectId = (value, helper) => {
  if (Types.ObjectId.isValid(value)) return true;
  return helper.message("Receiver must be a valid objectId");
};
export const generalFeilds = {
  userName: joi.string().min(3).max(20),
  email: joi.string().email(),
  password: joi.string(),
  confirmPassword: joi.string().valid(joi.ref("password")),
  phone: joi.string(),
  role: joi.string().valid(...Object.values(roletypes)),
  gender: joi.string().valid(...Object.values(gendertypes)),
};
