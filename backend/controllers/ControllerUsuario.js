const express = require("express");
const routerUsuario = express.Router();
const { config } = require("../config");
const ServiceUsuario = require("../services/ServiceUsuario");

let usuario = new ServiceUsuario();

routerUsuario.post("/register", (req, res) => {
  let newUsuario = req.body;
  console.log("se obtiene el usuario", newUsuario);
  res.status(200).json(usuario.updateUsuario(newUsuario));
});

module.exports = routerUsuario;
