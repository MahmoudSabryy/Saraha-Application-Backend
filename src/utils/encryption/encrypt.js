import CryptoJS from "crypto-js";
export const encrypt = ({ palintext, signature }) => {
  return CryptoJS.AES.encrypt(palintext, signature).toString();
};
export const decrypt = ({ encrypted, signature }) => {
  return CryptoJS.AES.decrypt(encrypted, signature).toString(CryptoJS.enc.Utf8);
};
