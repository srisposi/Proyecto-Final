const express = require("express");
const cluster = require("cluster");
let mode_cluster = process.argv[2] == "Cluster";
const loggerWinston = require("../loggers/winston");
const numCPUs = require("os").cpus().length;

function queryPerformance(callback) {
  if (mode_cluster && cluster.isPrimary) {
    loggerWinston.info(`PID -> $process.pid`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, a, b) => {
      loggerWinston.error(`Murió el subproceso ${worker.process.pid}`);
      cluster.fork();
    });
  } else {
    callback();
  }
}

module.exports = queryPerformance();
