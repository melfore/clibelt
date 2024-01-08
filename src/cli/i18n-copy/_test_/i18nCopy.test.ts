import { checkSingleFile } from "../utils";

import result from "./testFileResult.js";
import path from "node:path";

describe("Copy-Test", () => {
  const file = path.join(process.cwd(), "src/cli/i18n-copy/_test_/testFile.js");
  it("CheckSignleFile", async () => {
    const res = await checkSingleFile(file, "it", "pl");
    expect(res).toEqual(result.messages);
  });
  it("Wrong --from param", async () => {
    await expect(() => checkSingleFile(file, "FR", "pl")).rejects.toThrow("--from FR not exist");
  });
});
