const express = require("express");
let fs = require("fs");
let { config, mongo_db } = require("./config");
const app = express();
const path = require("path");
const routerCart = require("./controllers/ControllerCarrito");
const routerProd = require("./controllers/ControllerProductos");
const routerUser = require("./controllers/ControllerUsuario");
const cors = require("cors");
const mongoose = require("mongoose");
const cluster = require("cluster");
let mode_cluster = process.argv[2] == "Cluster";
const loggerWinston = require("./utils/loggers/winston");
const numCPUs = require("os").cpus().length;

// const queryPerformance = require("./utils/performance/queryPerformance");

mongoose.connect(mongo_db.mongo_atlas, { useNewUrlParser: true }).then(() => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "/public"));
  app.use(cors(`${config.cors}`));

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
    const app = express();
    app.get("/api/health", (req, res, next) => {
      res.status(200).send({ message: "OK!" });
    });
  }
  app.use("/api/productos", routerProd);

  app.use("/api/carritos", routerCart);

  app.use("/api/usuario", routerUser);

  app.listen(config.port, () => {
    console.log(
      `Estamos escuchando en está url: http://localhost:${config.port}`
    );
  });
  const queryHealth = () => {
    const app = express();
    app.get("/api/health", (req, res, next) => {
      res.status(200).send({ message: "OK!" });
    });
  };
  // queryPerformance.queryPerformance(queryHealth);
});
