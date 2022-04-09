import express from "express";
import { config, logger, mongodb } from "#server/lib";

// TODO just a file server currently, should be replaced by a real api server
function startServer() {
  const server = express();

  server.use(express.static(config.rootdir));
  server.listen(config.server.port, "localhost");
}

(function main() {
  logger.info("connecting to mongodb...");
  mongodb.connect();

  logger.info("starting server...");
  startServer();
})();
