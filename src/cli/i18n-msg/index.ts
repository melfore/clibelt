#!/usr/bin/env node
// "split-messages": "node ./utils/generate-messages.js && prettier --write \"./src/messages/*.js*\" \"./utils/messages-sort-temp*.js*\"",

import fs from "fs";
import path from "path";
import os from "os";
// import prettier from "prettier";
import config from "../../config";

export const CLI_NAME = "i18nMsg";

interface Translation {
  l: string;
  v: string;
}

interface Message {
  code: string;
  tr: Translation[];
}

interface OutputMessages {
  [code: string]: string;
}

interface OutputMessagesAllLangs {
  [lang: string]: OutputMessages;
}

//
// I/O files
//
const inputFile = path.join(process.cwd(), config.get(CLI_NAME).input);
const mal = require(inputFile); // FIXME

const outMsgDir = path.join(process.cwd(), config.get(CLI_NAME).outMsg);
const outTsFile = path.join(process.cwd(), config.get(CLI_NAME).outTs);

const EXT: string = "json";

const info = `Splitting "${config.get(CLI_NAME).input}" into lang messages in folder "${
  config.get(CLI_NAME).outMsg
}" and TS constants "${config.get(CLI_NAME).outTs}"...`;
console.log(info);

// writes a generic object to json or js file
const writeObjJson = (filename: string, obj: object) => {
  let data = "";
  switch (EXT) {
    case "js":
      data = `exports.messages = ${JSON.stringify(obj, null, 2)};`;
      // data = `exports.messages = ${JSON.stringify(obj)};`;
      break;
    case "json":
      data = JSON.stringify(obj, null, 2);
      break;
    default:
      console.log(`Invalid output file extension "${filename}"`);
      break;
  }

  if (data) {
    fs.writeFile(filename, data, (err) => {
      if (err) console.log(err);
      console.log(`Successfully written to file "${filename}"`);
    });
  }
};

const tsName = (code: string): string => {
  return code.replace(/-/g, "_").replace(/\.(.)/g, (match, group1) => {
    return group1.toUpperCase();
  });
};

// writes a typescript source that exports translation codes as constants
const writeTs = (filename: string, messages: Message[]) => {
  const EOL = os.EOL;
  let output: string = "";
  messages.map((msg) => {
    output += `export const ${tsName(msg.code)} = "${msg.code}";${EOL}`;
  });

  fs.writeFile(filename, output, (err) => {
    if (err) console.log(err);
    console.log(`Successfully written to file "${filename}"`);
  });
};

// writes translations for each language
// writes temporary sorted file with all languages
const splitMessages = () => {
  const messages: Message[] = mal.messages;
  const sortedMessages = messages.sort((a, b) => a.code.localeCompare(b.code));
  writeObjJson(`${outMsgDir}/messages-sort-temp.${EXT}`, sortedMessages);

  writeTs(outTsFile, sortedMessages);

  const res: OutputMessagesAllLangs = {};
  sortedMessages.map((k) => {
    k.tr.map((t) => {
      if (!res[t.l]) {
        res[t.l] = {};
      }
      res[t.l][k.code] = t.v;
    });
  });

  Object.keys(res).map((n) => {
    writeObjJson(`${outMsgDir}/${n}.${EXT}`, res[n]);
  });
};

// main
splitMessages();
