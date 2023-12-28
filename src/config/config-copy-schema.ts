import schema from "./config-schema";
export default {
  i18nCopy: {
    from: {
      format: "countryCode",
      default: null,
      arg: "from",
    },
    to: {
      format: "countryCode",
      default: null,
      arg: "to",
    },
  },
  ...schema,
};
