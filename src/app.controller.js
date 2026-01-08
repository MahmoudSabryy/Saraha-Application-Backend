import connectdb from "./DB/connection.js";
import authrouter from "./Modules/Auth/auth.controller.js";
import messageRouter from "./Modules/Message/message.controller.js";
import userrouter from "./Modules/User/user.controller.js";
import globalErrorHandler from "./utils/error handling/globalErrorHandler.js";
import NotFoundHandler from "./utils/error handling/NotFoundHandler.js";
import cors from "cors";
const bootstrap = async (app, express) => {
  // test connection
  await connectdb();
  app.use(cors());
  // body parser
  app.use(express.json());
  // Auth Router
  app.use("/auth", authrouter);
  // User Router
  app.use("/user", userrouter);
  // message Router
  app.use("/message", messageRouter);
  // Not Found Handler
  app.all(/.*/, NotFoundHandler);
  // global Error Handler
  app.use(globalErrorHandler);
};
export default bootstrap;
