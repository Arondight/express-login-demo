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

function startServer() {
  const server = express();
  const store = connectMongoDBSession(session);

  function debug(...args) {
    logger.debug(m_NAME, ...args);
  }

  debug("port:", config.api.port);
  debug("session secret:", config.api.session.secret);
  debug("session key:", config.api.session.secret);
  debug("session store url:", config.api.session.connection);
  debug("session store collection:", config.api.session.secret);

  morgan.token("token", () => `debug: ${m_NAME}:`);

  server.use(morgan(":token :method :url :response-time"));
  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(
    session({
      secret: config.api.session.secret,
      key: config.api.session.secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 10000,
      },
      store: new store({
        uri: config.api.session.connection,
        collection: config.api.session.secret,
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
