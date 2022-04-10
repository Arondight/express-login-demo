import express from "express";
import path from "path";
import { config, logger } from "#src/lib";

function startServer() {
  const server = express();
  const distDir = path.resolve(config.dir.root, "dist");

  logger.debug("web server port:", config.web.port);

  server.use(express.static(distDir));
  server.listen(config.web.port, "localhost");
}

(function main() {
  logger.info(`starting web server at port ${config.web.port}...`);
  startServer();
})();
