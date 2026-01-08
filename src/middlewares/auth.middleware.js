import UserModel from "../DB/Models/user.model.js";
import { verifytoken } from "../utils/token/token.js";
export const roletypes = {
  Admin: "admin",
  User: "user",
};
export const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return next(new Error("Authorize header is required", { cause: 401 }));
    const [Bearer, token] = authorization.split(" ");
    let TOKEN_SIGNATURE = undefined;
    switch (Bearer) {
      case "user":
        TOKEN_SIGNATURE = process.env.TOKEN_SECRET_USER;
        break;
      case "admin":
        TOKEN_SIGNATURE = process.env.TOKEN_SECRET_ADMIN;
        break;
      default:
        break;
    }
    const decoded = verifytoken({ token: token, signature: TOKEN_SIGNATURE });
    if (!decoded) {
      return next(new Error("invalid payload", { cause: 400 }));
    }

    const user = await UserModel.findById(decoded.id);
    if (!user) return next(new Error("User not found", { cause: 404 }));
    if (user.changedAT?.getTime() > decoded.iat * 1000)
      return next(new Error("please login again", { cause: 401 }));
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};
export const allowto = (roles = []) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return next(new Error("you are not Allowed", { cause: 403 }));
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
};
