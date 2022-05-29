let { config } = require("../../config");
let winston = require("winston");
let FormatLog = config.dev ? "Console" : "File";
let objWinston = config.dev
  ? {
      filename: "winston.dev.log",
      level: "verbose",
    }
  : {
      filename: "winston.log",
      level: "warn",
    };

const logger = winston.createLogger({
  level: "silly",
  transports: [new winston.transports[FormatLog](objWinston)],
});

module.exports = logger;
