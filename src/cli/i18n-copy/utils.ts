import fs from "fs";
import path from "path";
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

/**
 * Controlla e aggiorna un singolo file di traduzioni
 */
export const checkSingleFile = async (inputPath: string, from: string, to: string, disableWrite = false) => {
  const fileContent = readTranslationFile(inputPath);

  const messages = manageContent(fileContent, inputPath);

  const newContent = processMessages(messages, from, to);

  await saveInputFile(disableWrite, fileContent, inputPath, newContent, "exports");

  return newContent;
};

/**
 * Controlla e aggiorna più file di traduzioni
 */
export const checkMultipleFile = async (inputPath: string, from: string, to: string, disableWrite = false) => {
  const fileContent = readTranslationFile(inputPath);

  const messages = manageContent(fileContent, inputPath);

  const newContent = processMessages(messages, from, to);

  await saveInputFile(disableWrite, fileContent, inputPath, newContent, "module.exports");

  return newContent;
};

/**
 * Legge e valuta il contenuto di un file JavaScript di traduzioni
 *
 * @param inputPath Percorso del file da leggere
 * @returns Il contenuto del file come oggetto JavaScript
 */
const readTranslationFile = (inputPath: string): any => {
  try {
    // Leggiamo il file come stringa
    const fileContent = fs.readFileSync(inputPath, "utf-8");

    let result;

    // Strategia 1: Verifichiamo se il file contiene "exports = "
    if (fileContent.includes("exports = ")) {
      // Estraiamo il contenuto dopo "exports = "
      const jsonContent = fileContent
        .replace(/^[\s\S]*exports\s*=\s*/, "") // Rimuove tutto fino a "exports = "
        .replace(/;[\s\S]*$/, ""); // Rimuove eventuali caratteri dopo il punto e virgola finale

      // Creiamo un modulo virtuale per valutare il codice in un contesto sicuro
      const vm = require("vm");
      const sandbox = { result: null };
      vm.createContext(sandbox);
      vm.runInContext(`result = ${jsonContent}`, sandbox);

      result = sandbox.result;
    }
    // Strategia 2: Verifichiamo se il file contiene "module.exports = "
    else if (fileContent.includes("module.exports = ")) {
      const jsonContent = fileContent.replace(/^[\s\S]*module\.exports\s*=\s*/, "").replace(/;[\s\S]*$/, "");

      const vm = require("vm");
      const sandbox = { result: null };
      vm.createContext(sandbox);
      vm.runInContext(`result = ${jsonContent}`, sandbox);

      result = sandbox.result;
    }
    // Strategia 3: Proviamo comunque a usare require
    else {
      const resolvedPath = path.resolve(inputPath);
      delete require.cache[resolvedPath];
      result = require(resolvedPath);
    }

    return result;
  } catch (error) {
    throw new Error(
      `Errore nella lettura del file ${inputPath}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

/**
 * Gestisci diversi formati possibili del file
 *
 * @param fileContent
 * @param inputPath
 * @returns
 */
const manageContent = (fileContent: any, inputPath: string) => {
  let messages;

  if (fileContent && fileContent.messages) {
    // Formato standard: { messages: [...] }
    messages = fileContent.messages;
  } else if (fileContent && Array.isArray(fileContent)) {
    // Formato alternativo: array diretto
    messages = fileContent;
  } else if (fileContent && typeof fileContent === "object") {
    // Formato anomalo: proviamo a vedere se il fileContent stesso è l'oggetto
    messages = [fileContent];
  } else {
    throw new Error(`Formato del file non valido: impossibile trovare la struttura dei messaggi in ${inputPath}`);
  }

  if (!Array.isArray(messages)) {
    throw new Error(`Formato del file non valido: impossibile interpretare i messaggi come array in ${inputPath}`);
  }

  return messages;
};

/**
 * Processa i messaggi e aggiunge le traduzioni mancanti
 *
 * @param messages Array di messaggi da processare
 * @param from Lingua di origine
 * @param to Lingua di destinazione
 * @returns Array di messaggi aggiornata
 */
const processMessages = (messages: Message[] | any, from: string, to: string): Message[] => {
  // Verifica che messages sia un array
  if (!Array.isArray(messages)) {
    throw new Error(`Formato dei messaggi non valido: atteso un array, ricevuto ${typeof messages}`);
  }

  return messages.map((message: Message) => {
    // Processa le traduzioni principali
    processTranslations(message.tr, from, to);

    // Processa le traduzioni degli override dei clienti, se presenti
    if (message.overrides) {
      message.overrides.forEach((override: CustomerOverride, index: number) => {
        processTranslations(override.tr, from, to);
      });
    }

    return message;
  });
};

/**
 * Processa una singola array di traduzioni e aggiunge la traduzione mancante
 *
 * @param translations Array di traduzioni da processare
 * @param from Lingua di origine
 * @param to Lingua di destinazione
 * @returns Il valore della traduzione di origine
 */
const processTranslations = (translations: Translation[], from: string, to: string): string => {
  let sourceValue = "";
  let targetExists = false;

  // Cerca il valore della lingua di origine e verifica se la lingua di destinazione esiste già
  translations.forEach((translation: Translation) => {
    if (translation.l === from) {
      sourceValue = translation.v;
    }
    if (translation.l === to) {
      targetExists = true;
    }
  });

  // Verifica se la lingua di origine esiste
  if (!sourceValue) {
    throw new Error(`--from ${from} not exist`);
  }

  // Aggiungi la traduzione nella lingua di destinazione se non esiste già
  if (!targetExists) {
    translations.push({ l: to, v: sourceValue });
  }

  return sourceValue;
};

const saveInputFile = async (
  disableWrite: boolean,
  fileContent: any,
  inputPath: string,
  newContent: Message[],
  moduleType: "exports" | "module.exports"
) => {
  if (disableWrite) {
    return;
  }

  // Manteniamo il formato originale del file
  if (fileContent && fileContent.messages) {
    await writeFormattedContent(inputPath, { messages: newContent }, moduleType);
  } else {
    await writeFormattedContent(inputPath, newContent, moduleType);
  }
};

/**
 * Scrive il contenuto formattato nel file
 * @param inputPath Percorso del file
 * @param content Contenuto da scrivere
 * @param moduleType Tipo di export ('exports' o 'module.exports')
 */
const writeFormattedContent = async (
  inputPath: string,
  content: any,
  moduleType: "exports" | "module.exports"
): Promise<void> => {
  const writeContent = `${moduleType} = ${JSON.stringify(content)}`;
  const prettierContent = await prettier.format(writeContent, {
    parser: "babel",
    printWidth: 120,
  });
  fs.writeFileSync(inputPath, prettierContent, "utf-8");
};
