const { json } = require("express/lib/response");
const { UsuarioDao } = require("../daos/UsuarioDaos");
const UnauthorizeException = require("../exceptions/UnauthorizeException");
class ServiceUsuario {
  async updateUsuario(newUsuario) {
    try {
      const usuarioDao = new UsuarioDao();
      const usuarioExist = await usuarioDao.getUser(newUsuario.email);
      console.log("usuario existe", usuarioExist);
      if (!usuarioExist) {
        console.log("Ingreso en el if");
        console.log(newUsuario);
        return await usuarioDao.create(newUsuario);
      } else {
        console.log("estoy en el else");
        return { message: "El usuario ya existe" };
      }
    } catch (error) {
      console.log(error);
      return { message: "Ocurrió un error" };
    }
  }

  async signInUsuario(email, password) {
    const usuarioDao = new UsuarioDao();
    const usuarioExist = await usuarioDao.getUser(email, password);
    console.log(usuarioExist);
    if (usuarioExist) {
      return { token: `${email}:${password}` };
    } else {
      throw new UnauthorizeException("El usuario no existe");
    }
  }
}

module.exports = ServiceUsuario;
