# clibelt

CLI belt: the Melfore tool belt

## Usage

### Install

```shell
npm install @melfore/clibelt
```

### Add scripts to `package.json`

Add required CLIs to your `package.json`, for example:

```json
"scripts": {
  "i18n": "i18n-msg",
  "i18n:copy": "i18n-copy --from it --to fr",
  "pwd2hash": "pwd2hash"
}
```

### Configure

There are three ways to configure a CLI.

#### Clibelt configuration

Create a file `.clibelt.json` in project root.

Configuration example:

```json
{
  "i18nMsg": {
    "input": "./resources/messages-all-langs.js",
    "outMsg": "./src/messages",
    "outTs": "./src/messages/i18nMessages.ts"
  }
}
```

#### Command line arguments

Add arguments to script in `package.json`, for example:

```json
"scripts": {
  "i18n": "i18n-msg --input new/path --outTs new/constants.ts"
}
```

#### Environment variables

Run script with CLI's specific env variables set.

## CLIs

### i18n-msg

`i18n-msg`:

- splits an input file containing all the translations into one file for each language
- creates a TypeScript source containing a constant for each message.

#### Configuration

Add `i18nMsg` to `.clibelt.json`.

##### Options

| .clibelt param | command line arg | env variable | Description                                | Example                        |
| -------------- | ---------------- | ------------ | ------------------------------------------ | ------------------------------ |
| input          | i18n-input       | I18N_INPUT   | the input file containing all translations | ./resources/messages-all-langs |
| outMsg         | i18n-out-msg     | I18N_OUT_MSG | splitted messages output directory         | ./src/messages                 |
| outTs          | i18n-out-ts      | I18N_OUT_TS  | TypeScript constants output file           | ./src/messages/i18nMessages.ts |

Example:

```json
{
  "i18nMsg": {
    "input": "./resources/messages-all-langs.js",
    "outMsg": "./src/messages",
    "outTs": "./src/messages/i18nMessages.ts"
  }
}
```

### pwd2hash

`pwd2hash` generates an hash for input string

#### Configuration

No configuration is required, just add to `package.json` script and run:

```shell
npm run pwd2hash string_to_hash
```

test
