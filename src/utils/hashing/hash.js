import bcrypt from "bcrypt";
export const hash = ({ plainText, saltRound = process.env.SALTROUND }) => {
  return bcrypt.hashSync(plainText, Number(saltRound));
};
export const compare = ({ plainText, user_password }) => {
  return bcrypt.compareSync(plainText, user_password);
};
