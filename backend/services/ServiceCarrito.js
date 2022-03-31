const fs = require("fs");
const UUID = require("uuidjs");
const ServiceProductos = require("./ServiceProductos");
const { CarritoDao } = require("../daos/CarritoDaos");
const { ProductoDao } = require("../daos/ProductoDaos");
class ServiceCarrito {
  constructor(url_archivo) {
    this.url_archivo = url_archivo;
    this.formatFile = "utf-8";
    this.table = "carrito";
    this.productoServices = new ServiceProductos();
  }

  async getDb() {
    return fs.promises
      .readFile(this.url_archivo, this.formatFile)
      .then((response) => {
        let jsonResponse = JSON.parse(response);
        return jsonResponse;
      });
  }

  async getTable() {
    return this.getDb().then((response) => {
      return response[this.table];
    });
  }

  async saveTable(newTableData) {
    this.getDb().then((response) => {
      response[this.table] = newTableData;
      return fs.promises
        .writeFile(this.url_archivo, JSON.stringify(response))
        .then(() => {
          return newTableData;
        });
    });
  }

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
      let productosAsignados = []

      if(carrito.productos.length > 0)
        productosAsignados = carrito.productos;
      
      productosAsignados.push(idProd);
      
      await carritoDao.update(id, {productos: productosAsignados});

      return this.getById(id);

    } catch (error) {
      console.log(error);
      return { message: "Ocurrio un error" };
    }
  }

  async removeProductoById(id, idProd) {
    try {
      const carritoDao = new CarritoDao();
      let carrito = carritoDao.getById(id);

      let productosAsignados = []

      if(carrito.productos !== undefined)
        productosAsignados = carrito.productos;
      
      productosAsignados.push(idProd);
      
      return await carritoDao.update(id, {productos: productosAsignados});
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

}
module.exports = ServiceCarrito;
