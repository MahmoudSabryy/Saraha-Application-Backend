import asyncHandler from "../../utils/error handling/asyncHandler.js";
import * as authservice from "./auth.service.js";
import { Router } from "express";
import { validation } from "../../middlewares/validation.middelware.js";
import * as authvalodation from "../../Modules/Auth/auth.validation.js";
const authrouter = Router();
authrouter.post(
  "/register",
  validation(authvalodation.registerSchema),
  asyncHandler(authservice.register)
);
authrouter.post(
  "/login",
  validation(authvalodation.loginSchema),
  asyncHandler(authservice.login)
);
authrouter.get(
  "/activate_account/:token",
  asyncHandler(authservice.activate_account)
);
export default authrouter;
