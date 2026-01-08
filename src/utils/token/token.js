import jwt from "jsonwebtoken";
export const generatetoken = ({ payload, signature, options = {} }) => {
  return jwt.sign(payload, signature, options);
};
export const verifytoken = ({ token, signature, options = {} }) => {
  return jwt.verify(token, signature);
};
