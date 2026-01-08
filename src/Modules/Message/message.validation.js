import joi from "joi";
import { isValidObjectId } from "../../middlewares/validation.middelware.js";

export const sendMessageSchema = joi
  .object({
    content: joi.string().required(),
    receiver: joi.custom(isValidObjectId),
  })
  .required();
export const getSingleMessageSchema = joi
  .object({
    messageid: joi.custom(isValidObjectId).required(),
  })
  .required();

export const flags = {
  inbox: "inbox",
  outbox: "outbox",
};
export const getAllMessageSchema = joi
  .object({
    flag: joi
      .string()
      .valid(...Object.values(flags))
      .required(),
  })
  .required();
export const updateMessageSchema = joi
  .object({
    messageid: joi.custom(isValidObjectId).required(),
    content: joi.string().required(),
  })
  .required();
