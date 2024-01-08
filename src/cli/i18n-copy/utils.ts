import fs from "fs";
import * as prettier from "prettier";

interface Translation {
  l: string;
  v: string;
}

interface CustomerOverride {
  customer: string;
  tr: Translation[];
}

interface Message {
  code: string;
  tr: Translation[];
  overrides?: CustomerOverride[];
}

export const checkSingleFile = async (inputPath: string, from: string, to: string) => {
  const fileContent = require(inputPath);
  let addValue = "";
  let existLang = false;

  const newContent = fileContent.messages.map((messages: Message) => {
    messages.tr.forEach((value: Translation) => {
      if (value.l === from) {
        addValue = value.v;
      }
      if (value.l === to) {
        existLang = true;
      }
    });
    if (!addValue) {
      throw new Error("--from " + from + " not exist");
    }
    if (!existLang) {
      messages.tr.push({ l: to, v: addValue });
    }

    if (messages.overrides) {
      messages.overrides.forEach((i: CustomerOverride, index) => {
        let addOverrideValue = "";
        let existOverridesLang = false;
        i.tr.forEach((value: Translation) => {
          if (value.l === from) {
            addOverrideValue = value.v;
          }
          if (value.l === to) {
            existOverridesLang = true;
          }
        });

        if (!addOverrideValue) {
          throw new Error("--from " + from + " not exist");
        }

        if (!existOverridesLang) {
          messages.overrides![index].tr.push({ l: to, v: addOverrideValue });
        }
      });
    }

    return messages;
  });
  const writeContent = "exports.messages = " + JSON.stringify(newContent);
  const prettierContent = await prettier.format(writeContent, { parser: "babel" });
  fs.writeFileSync(inputPath, prettierContent, "utf-8");
  return newContent;
};

export const checkMultipleFile = async (inputPath: string, from: string, to: string) => {
  const fileContent = require(inputPath);
  let addValue = "";
  let existLang = false;

  const newContent = fileContent.map((messages: Message) => {
    messages.tr.forEach((value: Translation) => {
      if (value.l === from) {
        addValue = value.v;
      }
      if (value.l === to) {
        existLang = true;
      }
    });
    if (!addValue) {
      throw new Error("--from " + from + " not exist");
    }
    if (!existLang) {
      messages.tr.push({ l: to, v: addValue });
    }

    if (messages.overrides) {
      messages.overrides.forEach((i: CustomerOverride, index) => {
        let addOverrideValue = "";
        let existOverridesLang = false;
        i.tr.forEach((value: Translation) => {
          if (value.l === from) {
            addOverrideValue = value.v;
          }
          if (value.l === to) {
            existOverridesLang = true;
          }
        });

        if (!addOverrideValue) {
          throw new Error("--from " + from + " not exist");
        }

        if (!existOverridesLang) {
          messages.overrides![index].tr.push({ l: to, v: addOverrideValue });
        }
      });
    }

    return messages;
  });
  const writeContent = "module.exports = " + JSON.stringify(newContent);
  const prettierContent = await prettier.format(writeContent, { parser: "babel" });
  fs.writeFileSync(inputPath, prettierContent, "utf-8");
};
