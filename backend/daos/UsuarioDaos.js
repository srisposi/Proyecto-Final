const schemaUsuario = require("../models/ModelUsuario");
const bcrypt = require("bcrypt");
// const bcrypt = require("../utils/helpers/crypt");

class UsuarioDao {
  async getUser(user) {
    const emailUser = user.email;
    console.log("se obtiene el email del usuario", emailUser);
    console.log("el user era", user);
    return await schemaUsuario.findOne({ email: emailUser });
  }

  async create(userToCreate) {
    //Lógica sin Hash
    // let userCreated = await schemaUsuario.create({ ...userToCreate });
    // return userCreated;

    //Lógica para encriptar
    let newPassword = userToCreate.password;
    console.log("password que llega", newPassword);

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) return next(err);

        newPassword = hash;
        console.log("password hasheado", newPassword);

        return newPassword;
      });
    });

    let userCreated = await schemaUsuario.create({
      lastName: userToCreate.lastName,
      firstName: userToCreate.firstName,
      email: userToCreate.email,
      password: newPassword,
    });

    console.log("se guarda en la BD", userCreated);
    return userCreated;
  }
}

module.exports = { UsuarioDao };
