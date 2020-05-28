const path = require("path");
const fs = require("fs");

// Read a CLI's specific configuration from unique config file.
// Example:
//    const cliConfig = loadConfigFromFile({ cliName: CLI_NAME });
// json format only
export const loadConfigFromFile = ({ cliName, dir = "." }: { cliName: string; dir?: string }): object => {
  const pathName = path.join(process.cwd(), dir, ".clibelt.json");
  console.log("pathName", pathName);

  console.log(`loadConfig - read configuration for cli:${cliName} from file:${pathName}`);

  const content = fs.readFileSync(pathName);

  const config = JSON.parse(content);
  return config[cliName];
};
