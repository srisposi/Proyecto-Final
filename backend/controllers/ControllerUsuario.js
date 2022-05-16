const express = require("express");
const routerUsuario = express.Router();
const { config } = require("../config");
const ServiceUsuario = require("../services/ServiceUsuario");
const UnauthorizeException = require("../exceptions/UnauthorizeException");

let usuario = new ServiceUsuario();

routerUsuario.post("/register", (req, res) => {
  let newUsuario = req.body;
  console.log("se obtiene el usuario", newUsuario);
  res.status(200).json(usuario.updateUsuario(newUsuario));
});

routerUsuario.post("/signIn", async (req, res) => {
  try {
    let { email, password } = req.body;
    let token = await usuario.signInUsuario(email, password);
    res.status(200).json(token);
  } catch (error) {
    if (error instanceof UnauthorizeException)
      res.status(400).json({ message: error.message });
    else res.status(500).json({ message: error.message });
  }
});

module.exports = routerUsuario;
