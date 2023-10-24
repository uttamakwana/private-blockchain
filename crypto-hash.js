import crypto from "crypto";

export const cryptoHash = (...input) => {
  const hash = crypto.createHash("sha256");
  hash.update(input.sort().join(""));
  return hash.digest("hex");
};
