const { json } = require("express/lib/response");
const { UsuarioDao } = require("../daos/UsuarioDaos");
const UnauthorizeException = require("../exceptions/UnauthorizeException");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const PRIVATE_KEY = "myprivatekey";
const md5 = require("md5");
class ServiceUsuario {
  encodePassword(password) {
    let newPassword = md5(password);
    console.log(newPassword);
    let prueba = md5(newPassword);
    console.log(prueba);
    return newPassword;
  }

  generateToken(email) {
    const token = jwt.sign({ data: email }, PRIVATE_KEY, { expiresIn: "1h" });
    return token;
  }

  decodeToken(token) {
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload;
  }

  // encode64(token) {
  //   let buff = new Buffer(token);
  //   let base64data = buff.toString("base64");
  //   return base64data;
  // }

  // decode64(token) {
  //   let buff = new Buffer(token, "base64");
  //   let text = buff.toString("ascii");
  //   return text;
  // }

  async getUserByToken(token) {
    try {
      const usuarioDao = new UsuarioDao();
      let data = this.decodeToken(token); //user:password
      const email = data.split(":")[0];
      const password = data.split(":")[1];

      const usuario = await usuarioDao.getUserByEmailAndPassword(
        email,
        password
      );

      return usuario;
    } catch (error) {
      return null;
    }
  }

  async createUsuario(email, password, firstname, lastname) {
    try {
      const usuarioDao = new UsuarioDao();
      const usuario = await usuarioDao.getUser(email);

      if (!usuario) {
        return await usuarioDao.create(
          email,
          this.encodePassword(password),
          firstname,
          lastname
        );
      } else {
        return { message: "User already exist" };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getToken(email, password) {
    const usuarioDao = new UsuarioDao();
    const usuario = await usuarioDao.getUserByEmailAndPassword(
      email,
      this.encodePassword(password)
    );

    if (usuario) {
      let tokenResponse = this.generateToken(
        `${email}:${this.encodePassword(password)}`
      );
      //verify token
      console.log(this.decodeToken(tokenResponse));
      const user = await this.getUserByToken(tokenResponse);
      console.log(user);

      return tokenResponse;
    } else {
      throw new UnauthorizeException("Not allowed");
    }
  }
}

module.exports = ServiceUsuario;
