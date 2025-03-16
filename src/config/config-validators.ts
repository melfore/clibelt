/**
 * Convict format validators.
 * Adds custom validations to the folloing predefinite formats:
 *  - * - any value is valid
 *  - int
 *  - port
 *  - windows_named_pipe
 *  - port_or_windows_named_pipe
 *  - nat - positive integer (natural number)
 *
 * Usage:
 *    convict.addFormat() - add one (single exported value)
 *    convict.addFormats() - add all (default export)
 *  then use validator `name` in configuration schema `format` property
 */
import isEmail from "validator/lib/isEmail";
import isIP from "validator/lib/isIP";
import isURL from "validator/lib/isURL";
import isBoolan from "validator/lib/isBoolean";
import isInt from "validator/lib/isInt";
import isISO6391 from "validator/lib/isISO6391";

const assert = (assertion: boolean, err_msg: string) => {
  if (!assertion) {
    throw new Error(err_msg);
  }
};

export const email = {
  name: "email",
  coerce: (v: any) => v.toString(),
  validate: function (x: any) {
    assert(isEmail(x), "must be an email address");
  },
};

export const ipaddress = {
  name: "ipaddress",
  coerce: (v: any) => v.toString(),
  validate: (x: any) => {
    assert(isIP(x), "must be an IP address");
  },
};

export const url = {
  name: "url",
  coerce: (v: any) => v.toString(),
  validate: (x: any) => {
    assert(isURL(x, { require_tld: false }), "must be a URL");
  },
};

export const strictBoolean = {
  name: "strictBoolean",
  coerce: (v: any) => v.toString(),
  validate: (x: any) => {
    assert(isBoolan(x), "must be a boolean");
  },
};

export const serverPort = {
  name: "serverPort",
  coerce: (v: any) => v.toString(), // WARN seems to be not working
  validate: (x: any) => {
    assert(isInt(x?.toString(), { min: 1024, max: 65535 }), "must be a valid port number");
  },
};

export const int = {
  name: "int",
  coerce: (v: any) => v.toString(), // WARN seems to be not working
  validate: (x: any) => {
    assert(isInt(x?.toString()), "must be a valid integer number");
  },
};

export const countryCode = {
  name: "countryCode",
  coerce: (v: any) => v.toString(), // WARN seems to be not working
  validate: (x: any) => {
    assert(isISO6391(x?.toString()), "must be a valid country code");
  },
};

export default {
  email,
  ipaddress,
  url,
  strictBoolean,
  serverPort,
  countryCode,
};
