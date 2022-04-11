import rootDir from "#src/lib/rootdir";
import yaml from "#src/lib/yaml";
import path from "path";

class Config {
  constructor() {
    if (Config._instance) {
      return Config._instance;
    }

    Config._instance = this;

    const mongodb = yaml.load("mongodb");
    const api = yaml.load("api");
    const web = yaml.load("web");
    const dir = { root: rootDir, server: path.resolve(rootDir, "server") };

    if ("string" !== typeof mongodb.connection) {
      mongodb.connection = "mongodb://localhost:27019/express-login-demo";
    }

    api.port = parseInt(api.port) || 3000;
    api.session = Object.assign(
      {
        secret: "express-login-demo-session-secret",
        connection: "mongodb://localhost:27019/express-login-demo-session-secret",
      },
      api.session
    );
    web.port = parseInt(web.port) || 8000;

    this._config = { api, web, mongodb, dir: dir };
  }

  value() {
    return this._config;
  }
}

export default new Config().value();
