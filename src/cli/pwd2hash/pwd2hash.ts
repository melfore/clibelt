import { createHash } from "crypto";

export const genMD5Enc = (str: string) => {
  if (!str) {
    return "";
  }

  const hashEnc = createHash("md5").update(str).digest("hex");

  return hashEnc;
};

export const passwordHash = (password: string) => {
  const hash = genMD5Enc(password);
  return hash;
};
