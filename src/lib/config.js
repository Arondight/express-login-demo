import rootDir from "#src/lib/rootdir";
import yaml from "#src/lib/yaml";
import path from "path";

class Config {
  constructor() {
    if (Config._instance) {
      return Config._instance;
    }

    Config._instance = this;

    const defaultSettings = {
      api: {
        port: 3000,
        mongodb: {
          connection: "mongodb://localhost:27019/express-login-demo",
        },
        session: {
          secret: "express-login-demo-session-secret",
          cookie: { maxAge: 5 * 60 * 60 },
          mongodb: {
            connection: "mongodb://localhost:27019/express-login-demo-session",
            collection: "session",
          },
        },
      },
      web: { port: 8000 },
    };
    const api = Object.assign(defaultSettings.api, yaml.load("api"));
    const web = Object.assign(defaultSettings.web, yaml.load("web"));
    const dir = { root: rootDir, server: path.resolve(rootDir, "server") };

    api.port = parseInt(api.port);
    api.session.cookie.maxAge = parseInt(api.session.cookie.maxAge);
    web.port = parseInt(web.port);

    this._config = { api, web, dir };
  }

  value() {
    return this._config;
  }
}

export default new Config().value();
