const mLevelNames = Object.freeze(["error", "warn", "info", "debug"]);
const mLevels = Object.freeze({
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
});

class Logger {
  constructor() {
    if (Logger._instance) {
      return Logger._instance;
    }
    Logger._instance = this;
  }

  send(level, ...rest) {
    console[level < mLevels.warn ? "error" : "log"](
      `${mLevelNames[level]}:${" ".repeat(5 - mLevelNames[level].length)}`,
      ...rest
    );
  }

  error(...args) {
    return this.send(mLevels.error, ...args);
  }

  warn(...args) {
    return this.send(mLevels.warn, ...args);
  }

  info(...args) {
    return this.send(mLevels.info, ...args);
  }

  debug(...args) {
    return this.send(mLevels.debug, ...args);
  }
}

export default new Logger();
