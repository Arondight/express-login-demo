import config from "#src/lib/config";
import logger from "#src/lib/logger";
import mongoose from "mongoose";

function connectFactory() {
  let run = false;

  return function connect() {
    if (true === run) {
      return;
    }

    run = true;

    mongoose
      .connect(config.api.mongodb.connection)
      .then(() => logger.info("mongodb connected."))
      .catch((e) => {
        logger.error("failed connect to mongodb: ", e);
        logger.error("exit...");
        process.exit(1);
      });
  };
}

export default connectFactory();
