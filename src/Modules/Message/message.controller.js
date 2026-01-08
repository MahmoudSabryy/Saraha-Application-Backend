import { Router } from "express";
import * as messageService from "./message.service.js";
import * as messageValidation from "../../Modules/Message/message.validation.js";
import asyncHandler from "../../utils/error handling/asyncHandler.js";
import { allowto, authentication } from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middelware.js";
const router = Router();

router.post(
  "/",
  authentication,
  allowto(["user"]),
  validation(messageValidation.sendMessageSchema),
  asyncHandler(messageService.sendMessage)
);

router.get(
  "/:messageid",
  authentication,
  allowto(["user"]),
  validation(messageValidation.getSingleMessageSchema),
  asyncHandler(messageService.getSingleMessage)
);

router.get(
  "/",
  authentication,
  allowto(["user"]),
  validation(messageValidation.getAllMessageSchema),
  asyncHandler(messageService.getAllMessages)
);

router.patch(
  "/:messageid",
  authentication,
  allowto(["user"]),
  validation(messageValidation.updateMessageSchema),
  asyncHandler(messageService.updateMessage)
);

router.delete(
  "/:messageid",
  authentication,
  allowto(["user"]),

  asyncHandler(messageService.deleteMessage)
);

export default router;
