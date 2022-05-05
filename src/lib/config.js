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
          connection: "mongodb://localhost:27019/express-auth-demo",
        },
        session: {
          secret: "express-auth-demo-session-secret",
          cookie: { maxAge: 60 * 1000 },
          mongodb: {
            connection: "mongodb://localhost:27019/express-auth-demo-session",
            collection: "session",
          },
        },
      },
      cert: {
        cert: "cert.pem",
        key: "key.pem",
        pass: "express-auth-demo",
      },
      web: {
        port: 8000,
      },
    };
    const api = Object.assign(defaultSettings.api, yaml.load("api"));
    const cert = Object.assign(defaultSettings.cert, yaml.load("cert"));
    const web = Object.assign(defaultSettings.web, yaml.load("web"));
    const dir = {
      cert: path.resolve(rootDir, "cert"),
      root: rootDir,
      server: path.resolve(rootDir, "server"),
    };

    api.port = parseInt(api.port);
    api.session.cookie.maxAge = parseInt(api.session.cookie.maxAge);
    web.port = parseInt(web.port);

    this._config = { api, cert, dir, web };
  }

  value() {
    return this._config;
  }
}

export default new Config().value();
