import mongoose from "mongoose";
import config from "#src/api/lib/common/config";
import logger from "#src/api/lib/logger";

function connectFactory() {
  let run = false;

  return function connect() {
    if (true === run) {
      return;
    }

    run = true;

    mongoose
      .connect(config.mongodb.connection)
      .then(() => logger.info("mongodb connected."))
      .catch((e) => {
        logger.error("failed connect to mongodb: ", e);
        logger.error("exit...");
        process.exit(1);
      });
  };
}

export default connectFactory();
