import { allowto, authentication } from "../../middlewares/auth.middleware.js";
import * as userservice from "./user.service.js";
import * as userValidation from "../User/user.validation.js";
import { Router } from "express";
import asyncHandler from "../../utils/error handling/asyncHandler.js";
import { validation } from "../../middlewares/validation.middelware.js";
const router = Router();
router.get(
  "/profile",
  authentication,
  allowto(["user"]),
  asyncHandler(userservice.getprofile)
);
router.patch(
  "/",
  authentication,
  allowto(["user", "admin"]),
  validation(userValidation.updateProfileSchema),
  asyncHandler(userservice.updateProfile)
);
router.patch(
  "/changepassword",
  authentication,
  allowto(["user", "admin"]),
  validation(userValidation.changepassword),
  asyncHandler(userservice.changePassword)
);
router.delete(
  "/",
  authentication,
  allowto(["user", "admin"]),
  asyncHandler(userservice.deactivateAccount)
);

export default router;
