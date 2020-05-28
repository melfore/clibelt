export default {
  i18nMsg: {
    input: {
      doc: "Messages input file. Supported formats: JSON",
      format: String,
      default: "./resources/messages-all-langs",
      arg: "i18n-input",
      env: "I18N_INPUT",
    },
    outMsg: {
      doc: "i18n messages output files directory",
      format: String,
      default: "./src/messages",
      arg: "i18n-out-msg",
      env: "I18N_OUT_MSG",
    },
    outTs: {
      doc: "TypeScript source output directory",
      format: String,
      default: "./src/messages/i18nMessages.ts",
      arg: "i18n-out-ts",
      env: "I18N_OUT_TS",
    },
  },
};
