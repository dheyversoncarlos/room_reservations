import { genSaltSync, hashSync } from "bcrypt";

export const generatorHash = (password: string) => {
  const salt = genSaltSync(8);
  const hash = hashSync(password, salt);
  return hash;
};
