import { describe, expect, it } from "vitest";

import { passwordHash } from "../pwd2hash";

describe("verify password hash", () => {
  it("returns md5 hex value of password in case of password hash is running well", () => {
    const password = "NonDireGatto";
    const pwdHash = passwordHash(password);
    expect(pwdHash).toEqual("07d13c5f2f88ef41e18383e288b9d99a");
  });
  it("returns error in case of password is equal to password hash", () => {
    const password = "NonDireGatto";
    const pwdHash = passwordHash(password);
    expect(pwdHash).not.toEqual("NonDireGatto");
  });
});
