import compression from "compression";
import history from "connect-history-api-fallback";
import express from "express";
import morgan from "morgan";
import path from "path";
import { config, logger } from "#@src/lib";

const m_NAME = "web server";

function startServer() {
  const server = express();
  const distDir = path.resolve(config.dir.root, "dist");

  logger.debug(`${m_NAME} port:`, config.web.port);

  morgan.token("token", () => `debug: ${m_NAME}:`);
  server.use(morgan(":token :method :url :response-time"));
  server.use(history());
  server.use(compression());
  server.use(express.static(distDir));
  server.listen(config.web.port, "0.0.0.0");
}

(function main() {
  logger.info(`starting ${m_NAME} at port ${config.web.port}...`);
  startServer();
})();
