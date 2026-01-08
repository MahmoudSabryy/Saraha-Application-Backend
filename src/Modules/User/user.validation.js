import joi from "joi";
import { generalFeilds } from "../../middlewares/validation.middelware.js";
export const updateProfileSchema = joi
  .object({
    userName: generalFeilds.userName,
    email: generalFeilds.email,
    phone: generalFeilds.phone,
  })
  .required();
export const changepassword = joi
  .object({
    oldpassword: generalFeilds.password.required(),
    password: generalFeilds.password.not(joi.ref("oldpassword")).required(),
    confirmPassword: generalFeilds.confirmPassword.required(),
  })
  .required();
