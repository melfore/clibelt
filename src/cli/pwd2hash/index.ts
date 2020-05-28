#!/usr/bin/env node

import { passwordHash } from "./pwd2hash";

const pwd2hash = () => {
  const password = process.argv[2];

  console.log();

  const pwdHash = passwordHash(password);
  console.log(`\t[${password}] -> [${pwdHash}]`);

  console.log();
  console.log();
};

pwd2hash();
