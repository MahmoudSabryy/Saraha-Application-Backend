import joi from "joi";
import { generalFeilds } from "../../middlewares/validation.middelware.js";

export const registerSchema = joi
  .object({
    userName: generalFeilds.userName.required(),
    email: generalFeilds.email.required(),
    password: generalFeilds.password.required(),
    confirmPassword: generalFeilds.confirmPassword.required(),
    phone: generalFeilds.phone.required(),
    role: generalFeilds.role,
    gender: generalFeilds.gender,
  })
  .required();

export const loginSchema = joi
  .object({
    email: generalFeilds.email.required(),
    password: generalFeilds.password.required(),
  })
  .required();
