import { fork } from "child_process";
import path from "path";
import { config, logger } from "#@src/lib";

let mPostRunning = false;
const server = {
  api: { name: "api server", path: path.resolve(config.dir.server, "api.js"), process: undefined },
  web: { name: "web server", path: path.resolve(config.dir.server, "web.js"), process: undefined },
};

function run(type = "api" || "web") {
  if (!(type in server)) {
    return;
  }

  logger.info(`forking ${server[type].name} process...`);

  server[type].process = fork(server[type].path);
  server[type].process.on("exit", () => {
    if (false === mPostRunning) {
      logger.error(`${server[type].name} exits abnormally!`);
      process.kill(process.pid, "SIGTERM");
    }
  });
}

function kill(type = "api" || "web") {
  if (!(type in server)) {
    return;
  }

  if (undefined !== server[type].process) {
    logger.warn(`killing ${server[type].name} process...`);
    server[type].process.kill("SIGTERM");
  }
}

async function post() {
  if (false === mPostRunning) {
    mPostRunning = true; // {

    logger.info("quiting...");

    ["api", "web"].forEach((t) => kill(t));

    await new Promise((resolve) => setTimeout(resolve, 3000));
    // }
    mPostRunning = false;
  } else {
    while (true === mPostRunning) {
      await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    }
  }
}

(async function main() {
  for (const signal of ["SIGHUP", "SIGINT", "SIGTERM"]) {
    process.on(signal, () => post().then((n) => process.exit(n)));
  }

  ["api", "web"].forEach((t) => run(t));
})();
