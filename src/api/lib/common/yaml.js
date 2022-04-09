import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import rootdir from "#src/api/lib/common/rootdir";

function load(name) {
  const filename = `${name}.yml`;
  const configdir = path.resolve(rootdir, "configs");
  let filepath = path.resolve(configdir, filename);

  try {
    fs.accessSync(filepath, fs.constants.R_OK);
  } catch (e) {
    return {};
  }

  return yaml.load(fs.readFileSync(filepath, "utf-8"));
}

export default { load };
