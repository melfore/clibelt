// "pwd2hash": "node ./utils/pwd2hash"
import CryptoJS from "crypto-js";

export const genMD5Enc = (str: string) => {
  if (!str) {
    return "";
  }
  const hash = CryptoJS.MD5(str);

  // const hashEnc = hash.toString(CryptoJS.enc.Base64);
  const hashEnc = hash.toString(CryptoJS.enc.Hex);

  return hashEnc;
};

export const passwordHash = (password: string) => {
  const hash = genMD5Enc(password);
  return hash;
};
