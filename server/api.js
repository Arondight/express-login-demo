import bodyParser from "body-parser";
import connectMongoDBSession from "connect-mongodb-session";
import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import { mongodb } from "#@src/api/lib";
import router from "#@src/api/router";
import { config, logger } from "#@src/lib";

const m_NAME = "api server";

function debug(...args) {
  logger.debug(`${m_NAME}:`, ...args);
}

function startServer() {
  const server = express();
  const store = connectMongoDBSession(session);
  const maxAge = config.api.session.cookie.maxAge || 5 * 60 * 60;

  debug("port", config.api.port);
  debug("session secret", config.api.session.secret);
  debug("session store url", config.api.session.mongodb.connection);
  debug("session store collection", config.api.session.mongodb.collection);
  debug("session cookie maxAge", maxAge);

  morgan.token("token", () => `debug: ${m_NAME}:`);
  server.use(morgan(":token :method :url :response-time"));
  server.use(cors({ credentials: true, origin: true }));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(
    session({
      secret: config.api.session.secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge,
        expires: new Date(Date.now() + maxAge),
        secure: false,
      },
      store: new store({
        uri: config.api.session.mongodb.connection,
        collection: config.api.session.mongodb.collection,
      }),
    })
  );
  server.use("/hello", router.hello);
  server.use("/user", router.user);
  server.listen(config.api.port, "0.0.0.0");
}

async function post() {
  mongodb.disconnect();
}

(function main() {
  for (const signal of ["SIGHUP", "SIGINT", "SIGTERM"]) {
    process.on(signal, () => post().then((n) => process.exit(n)));
  }

  logger.info("connecting to mongodb...");
  mongodb.connect();

  logger.info(`starting ${m_NAME} ...`);
  startServer();
})();
