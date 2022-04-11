import bodyParser from "body-parser";
import connectMongoDBSession from "connect-mongodb-session";
import express from "express";
import session from "express-session";
import { mongodb } from "#@src/api/lib";
import router from "#@src/api/router";
import { config, logger } from "#@src/lib";

function startServer() {
  const server = express();
  const store = connectMongoDBSession(session);

  function debug(...args) {
    logger.debug("api server", ...args);
  }

  debug("port:", config.api.port);
  debug("session secret:", config.api.session.secret);
  debug("session key:", config.api.session.secret);
  debug("session store url:", config.api.session.connection);
  debug("session store collection:", config.api.session.secret);

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
  server.listen(config.api.port);
}

(function main() {
  logger.info("connecting to mongodb...");
  mongodb.connect();

  logger.info("starting api server...");
  startServer();
})();
