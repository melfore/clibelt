const fs = require("fs");
import config from "../../config";
import path from "path";
import { checkMultipleFile, checkSingleFile } from "./utils";

const langCopy = async () => {
  try {
    const inputPath = path.join(process.cwd(), config.get("i18nMsg").input);
    const from = config.get("i18nMsg").from;
    const to = config.get("i18nMsg").to;

    const ret = await langCopyExec(inputPath, from, to);

    console.log("Successfully copied");
    return 0;
  } catch (e) {
    console.error(e);
    return 1;
  }
};

const langCopyExec = async (inputPath: string, from: string | undefined, to: string | undefined) => {
  const isDir = fs.lstatSync(inputPath).isDirectory();

  if (!from || !to) {
    throw new Error("Missing from/to Param");
  }

  if (isDir) {
    const filesCheck = fs.readdirSync(inputPath);

    for (const fileName of filesCheck) {
      if (fileName !== "index.js") {
        const filePath = path.join(inputPath, fileName);
        await checkMultipleFile(filePath, from, to);
      }
    }
  } else {
    await checkSingleFile(inputPath, from, to);
  }
};

//Main
langCopy().then((res) => {
  process.exit(res);
});
