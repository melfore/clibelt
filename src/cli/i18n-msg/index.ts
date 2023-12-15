#!/usr/bin/env node
// "split-messages": "node ./utils/generate-messages.js && prettier --write \"./src/messages/*.js*\" \"./utils/messages-sort-temp*.js*\"",

import fs from "fs";
import path from "path";
import { EOL } from "os";
import config from "../../config";
import { emitWarning } from "process";

export const CLI_NAME = "i18nMsg";

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

const AUTOGENERATED_HEADER = `// autogenerated with "i18n-msg"
// DO NOT EDIT MANUALLY

`;

//
// I/O files
//
//const inputFile1 = path.join(process.cwd(),"./test/resources/prova/*");
const inputFile = path.join(process.cwd(), config.get(CLI_NAME).input);
const mal = require(inputFile); // FIXME
const outMsgDir = path.join(process.cwd(), config.get(CLI_NAME).outMsg);
const outTsFile = path.join(process.cwd(), config.get(CLI_NAME).outTs);
const outTempDir = path.join(process.cwd(), config.get(CLI_NAME).outTemp);
const outTsDir = path.dirname(outTsFile);

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
    try {
      fs.writeFileSync(filename, data);
      console.log(`Successfully written to file "${filename}"`);
    } catch (err) {
      console.log(err);
    }
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
  }, AUTOGENERATED_HEADER);

  try {
    fs.writeFileSync(filename, output);
    console.log(`Successfully written to file "${filename}"`);
  } catch (err) {
    console.log(err);
  }
};

const writeKeys = (key: string, translations: Translation[], output: OutputMessagesAllLangs) => {
  translations.forEach((t) => {
    if (!output[t.l]) {
      output[t.l] = {};
    }
    output[t.l][key] = t.v;
  });
};

const writeFiles = (language: string, translations: OutputMessagesAllLangs, dest: string) => {
  const langDir = path.dirname(dest);

  fs.mkdirSync(langDir, { recursive: true });
  writeObjJson(dest, translations[language]);
};

// writes translations for each language
// writes temporary sorted file with all languages
// if namespace param is set use it as filename and write files in different folder for each language

const splitMessages = (messages: Message[], namespace?: string) => {
  const sortedMessages = messages.sort((a, b) => a.code.localeCompare(b.code));
  const sortedName = namespace ? `${namespace}-sort-temp` : "messages-sort-temp";
  const tsFile = namespace ? `${outTsDir}/${namespace}.ts` : outTsFile;

  writeObjJson(`${outTempDir}/${sortedName}.${EXT}`, sortedMessages);
  writeTs(tsFile, sortedMessages);

  const res: OutputMessagesAllLangs = {};
  const overrides: { [customer: string]: OutputMessagesAllLangs } = {};

  sortedMessages.forEach((k) => {
    writeKeys(k.code, k.tr, res);

    k.overrides?.forEach((override) => {
      if (!overrides[override.customer]) {
        overrides[override.customer] = {};
      }

      writeKeys(k.code, override.tr, overrides[override.customer]);
    });
  });

  Object.keys(res).map((n) => {
    const dest = namespace ? `${outMsgDir}/${n}/${namespace}.${EXT}` : `${outMsgDir}/${n}.${EXT}`;
    writeFiles(n, res, dest);
  });

  Object.keys(overrides).map((customer) => {
    Object.keys(overrides[customer]).map((n) => {
      const dest = namespace
        ? `${outMsgDir}/${n}/${customer}-${namespace}.${EXT}`
        : `${outMsgDir}/${customer}-${n}.${EXT}`;

      writeFiles(n, overrides[customer], dest);
    });
  });
};

const writeNamespacesFile = (namespaces: MessagesNamespace[]) => {
  const content = namespaces.reduce((result, [ns]) => {
    return result + `export * from './${ns}';${EOL}`;
  }, AUTOGENERATED_HEADER);

  fs.writeFile(outTsFile, content, (err) => {
    if (err) {
      console.log("Error writing to", outTsFile);
    }
  });
};

const allLanguagesReport = (data: Message[], languages: string[])=>{
  data.forEach((value)=>{
    value.tr.forEach((i)=>{
      languages.push(i.l)
    })
    if(value.overrides){
      value.overrides.forEach((i)=>{
        i.tr.forEach((v)=>{
          languages.push(v.l)
        })
      })
    }
  })
}

const report = (data: Message[], languages:string[])=>{
  data.forEach((value)=>{
    let valueLanguages: string[] = []
    let valueLanguagesOverrites: string[] = []
    value.tr.forEach((i)=>{
      valueLanguages.push(i.l)
    })
    value.overrides?.forEach((i)=>{
      i.tr.forEach((value)=>{
        valueLanguagesOverrites.push(value.l)
      })
      const differentArrOverrides = languages.filter(x => !valueLanguagesOverrites.includes(x))
      if(differentArrOverrides[0]){
        console.log("    Code: ",("\x1b[31m" + value.code + "\x1b[0m")," Customer: ",("\x1b[31m" + i.customer + "\x1b[0m")," is missing the following languages: ", differentArrOverrides)
        }
        valueLanguagesOverrites = []
    })
    const differentArr = languages.filter(x => !valueLanguages.includes(x))
    if(differentArr[0]){
    console.log("    Code: ",("\x1b[31m" + value.code + "\x1b[0m")," is missing the following languages: ", differentArr)
    }

  })
}

const getAllLanguagesUnique = (languages: string[])=>{
  return languages.filter((value, index)=>languages.indexOf(value)===index)
}

const multiFileReport = (languages:string[], namespaces:MessagesNamespace[])=>{
  console.log()
  console.log("-------REPORT-------")
    const uniqueLang = getAllLanguagesUnique(languages)
    for (const [,messages] of namespaces) {
      report(messages,uniqueLang)
    }
    console.log("All languages: ", uniqueLang)
}

const singleFileReport = (message:Message[],languages:string[])=>{
  console.log()
  console.log("-----REPORT-------")
    const uniqueLang = getAllLanguagesUnique(languages)
      report(message,uniqueLang)
    console.log("All languages: ", uniqueLang)
}

const checkNamespaces = () => {
  fs.mkdirSync(outTempDir, { recursive: true });
  fs.mkdirSync(outMsgDir, { recursive: true });
  fs.mkdirSync(outTsDir, { recursive: true });

  const namespaces: MessagesNamespace[] = mal.namespaces ? Object.entries(mal.namespaces) : [];
  const languages: string[] = []
  if (namespaces.length > 0) {
    for (const [ns, messages] of namespaces) {
      allLanguagesReport(messages,languages)
      splitMessages(messages, ns);
    }
    multiFileReport(languages,namespaces)
    writeNamespacesFile(namespaces);
  } else {
    allLanguagesReport(mal.messages,languages)
    splitMessages(mal.messages);
    singleFileReport(mal.messages, languages)
  }

  
};

// main
checkNamespaces();
