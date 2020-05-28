//
// CLIs configuration
//
// import config from "../../config";
// Usages:
//    1)  config.get(CLI_NAME).property;                // autocomplete
//    2)  const cliConfig = config.getProp(CLI_NAME);
//        cliConfig("property");                        // no autocomplete
//
// Note: convict philosophy is to have production values be the default values.
//
import convict, { ValidateOptions } from "convict";
const convict_format_with_moment = require("convict-format-with-moment");
import path from "path";

import validators from "./config-validators";
import schema from "./config-schema";

// Any properties specified in config files that are not declared in the schema will print a warning (default)
const VALIDATE_WARN: ValidateOptions = { allowed: "warn" };

// Any properties specified in config files that are not declared in the schema will throw errors.
// This is to ensure that the schema and the config files are in sync
const VALIDATE_ERROR: ValidateOptions = { allowed: "strict" };

convict.addFormats(validators);
convict.addFormats(convict_format_with_moment);

const config = convict(schema);

const pathName = path.join(process.cwd(), ".clibelt.json");
config.loadFile(pathName);
config.validate(VALIDATE_WARN);

// Example:
//    const input = get(CLI_NAME)("input");
export const getProp = (cliName: string) => (param: string) => config.get(`${cliName}.${param}`);

export default { ...config, getProp };
