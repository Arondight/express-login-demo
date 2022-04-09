import rootdir from "#src/api/lib/common/rootdir";
import yaml from "#src/api/lib/common/yaml";

class Config {
  constructor() {
    if (Config._instance) {
      return Config._instance;
    }

    Config._instance = this;

    const mongodb = yaml.load("mongodb");
    const server = yaml.load("server");

    if ("string" !== typeof mongodb.connection) {
      mongodb.connection = "mongodb://localhost:27017/express-login-demo";
    }

    server.port = parseInt(server.port) || 3000;

    this._config = { mongodb, server, rootdir };
  }

  value() {
    return this._config;
  }
}

export default new Config().value();
