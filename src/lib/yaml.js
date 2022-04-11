import rootDir from "#src/lib/rootdir";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

function load(name) {
  const filename = `${name}.yml`;
  const configDir = path.resolve(rootDir, "config");
  let filepath = path.resolve(configDir, filename);

  try {
    fs.accessSync(filepath, fs.constants.R_OK);
  } catch (e) {
    return {};
  }

  return yaml.load(fs.readFileSync(filepath, "utf-8"));
}

export default { load };
