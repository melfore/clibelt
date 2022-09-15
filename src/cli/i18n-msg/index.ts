#!/usr/bin/env node
// "split-messages": "node ./utils/generate-messages.js && prettier --write \"./src/messages/*.js*\" \"./utils/messages-sort-temp*.js*\"",

import fs from "fs";
import path from "path";
import os, { EOL } from "os";
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

interface MessagesNamespace extends Array<string | Message[]> {
  0: string;
  1: Message[];
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
  const output: string = messages.reduce((result, msg) => {
    return result + `export const ${tsName(msg.code)} = "${msg.code}";${EOL}`;
  }, "");

  fs.writeFile(filename, output, (err) => {
    if (err) console.log(err);
    console.log(`Successfully written to file "${filename}"`);
  });
};

// writes translations for each language
// writes temporary sorted file with all languages
// if namespace param is set use it as filename and write files in different folder for each language

const splitMessages = (messages: Message[], namespace?: string) => {
  const sortedMessages = messages.sort((a, b) => a.code.localeCompare(b.code));
  const sortedName = namespace ? `${namespace}-sort-temp` : "messages-sort-temp";
  const tsFile = namespace ? `${outMsgDir}/${namespace}.ts` : outTsFile;

  writeObjJson(`${outMsgDir}/${sortedName}.${EXT}`, sortedMessages);
  writeTs(tsFile, sortedMessages);

  const res: OutputMessagesAllLangs = {};
  sortedMessages.forEach((k) => {
    k.tr.forEach((t) => {
      if (!res[t.l]) {
        res[t.l] = {};
      }
      res[t.l][k.code] = t.v;
    });
  });

  Object.keys(res).map((n) => {
    const dest = namespace ? `${outMsgDir}/${n}/${namespace}.${EXT}` : `${outMsgDir}/${n}.${EXT}`;
    const langDir = path.dirname(dest);

    fs.mkdirSync(langDir, { recursive: true });
    writeObjJson(dest, res[n]);
  });
};

const writeNamespacesFile = (namespaces: MessagesNamespace[]) => {
  const content = namespaces.reduce((result, [ns]) => {
    return result + `export * from './${ns}';${EOL}`;
  }, "");

  fs.writeFile(outTsFile, content, (err) => {
    if (err) {
      console.log("Error writing to", outTsFile);
    }
  });
};

const checkNamespaces = () => {
  fs.mkdirSync(outMsgDir, { recursive: true });

  const namespaces: MessagesNamespace[] = mal.namespaces ? Object.entries(mal.namespaces) : [];

  if (namespaces.length > 0) {
    namespaces.forEach(([ns, messages]) => {
      splitMessages(messages, ns);
    });
    writeNamespacesFile(namespaces);
  } else {
    splitMessages(mal.messages);
  }
};

// main
checkNamespaces();
