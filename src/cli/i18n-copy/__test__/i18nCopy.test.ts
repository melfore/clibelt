import { describe, expect, it } from "vitest";

import { checkSingleFile } from "../utils";

import resultENPL from "./testFileResultENPL.js";
import resultITPL from "./testFileResultITPL.js";

import path from "node:path";

describe("Copy-Test", () => {
  const file = path.join(__dirname, "testFile.js");

  it("CheckSignleFile EN-PL", async () => {
    const res = await checkSingleFile(file, "en", "pl", true);
    expect(res).toEqual(resultENPL.messages);
  });

  it("CheckSignleFile IT-PL", async () => {
    const res = await checkSingleFile(file, "it", "pl", true);
    expect(res).toEqual(resultITPL.messages);
  });

  it("Wrong --from param", async () => {
    await expect(() => checkSingleFile(file, "FR", "pl", true)).rejects.toThrow("--from FR not exist");
  });
});
