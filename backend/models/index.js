let { mongoose } = require("../config/mongoDB");
let { Schema, model } = mongoose;
let ProductosSchema = require("./schemas/productos");

let productosSchema = new Schema(ProductosSchema);
let ProductoModel = new model('producto', productosSchema);

module.exports = {
    ProductoModel
}