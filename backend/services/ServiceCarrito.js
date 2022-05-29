const fs = require("fs");
const UUID = require("uuidjs");
const ServiceProductos = require("./ServiceProductos");
const { CarritoDao } = require("../daos/CarritoDaos");
const { ProductoDao } = require("../daos/ProductoDaos");
const twilio_account_id = "AC7939d0acdbfa93943d441a0bede37e7b";
const twilio_token = "6d686dfff557c25b43f927b11455d4bc";
const twilioNumber = "+17342706859";
const toNumber = "+5491123867996";
let body = process.argv[2] || "probando Twilio";
const twilio = require("twilio")(twilio_account_id, twilio_token, {
  lazyloading: true,
});
class ServiceCarrito {
  async getAll() {
    try {
      const carritoDao = new CarritoDao();
      return carritoDao.getAll();
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  getUiid() {
    return UUID.genV4().hexString;
  }

  //Función para crear carrito y devolver id
  async createCarrito() {
    try {
      const carritoDao = new CarritoDao();

      let carrito = {
        id: this.getUiid(),
        timeStamp: Date.now(),
        producto: [],
      };

      return carritoDao.create(carrito);
    } catch (error) {
      console.log(error);
    }
  }

  //Función para Listar todos los productos disponibles por id
  async getById(id) {
    try {
      const carritoDao = new CarritoDao();
      let carrito = await carritoDao.getById(id);

      const productoDao = new ProductoDao();

      let productos = [];

      for (let index = 0; index < carrito.productos.length; index++) {
        let prodComplete = await productoDao.getById(carrito.productos[index]);
        productos.push(prodComplete);
      }

      carrito.productos = productos;

      return carrito;
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  //Función para actualizar un producto por id
  async addProductoById(id, idProd) {
    try {
      const carritoDao = new CarritoDao();
      let carrito = await carritoDao.getById(id);
      let productosAsignados = [];

      if (carrito.productos.length > 0) productosAsignados = carrito.productos;

      productosAsignados.push(idProd);

      await carritoDao.update(id, { productos: productosAsignados });

      return this.getById(id);
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  async removeProductoById(id, idProd) {
    try {
      //TODO: Agregar funcion para eliminar 1 producto de la lista con el id que pasa el controller
    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  //Función para elimiar buscando un id
  async deleteById(id) {
    try {
      const carritoDao = new CarritoDao();
      await carritoDao.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  twilioMessage() {
    twilio.messages
      .create({
        from: "Whatsapp: " + twilioNumber,
        to: "Whatsapp: " + toNumber,
        body,
      })
      .then((element) => {
        console.log(element);
      });
  }
}
module.exports = ServiceCarrito;
