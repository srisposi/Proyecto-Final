const { normalizeType } = require("express/lib/utils");
const mongoose = require("mongoose")
// const Joi = require("joi");

// let timestamp = Joi.date();
// let nombre = Joi.string().min(3);
// let precio = Joi.number();
// let descripcion = Joi.string().min(3);
// let codigo = Joi.string().min(3);
// let foto = Joi.string().min(3);
// let stock = Joi.number();
// let id = Joi.id();

// let productosSchema = {
//     timestamp: timestamp.required(),
//     nombre: nombre.required(),
//     precio: precio.required(),
//     descripcion: descripcion.required(),
//     codigo: codigo.required(),
//     foto: foto.required(),
//     stock: stock.required(),
//     id: id.required()
// }

const productosSchema = mongoose.Schema({
	timestamp: String,
    nombre: String,
    precio: String,
    descripcion: String,
    codigo: String,
    foto: String,
    stock: String,
    id: String
})


module.exports = mongoose.model("Producto", productosSchema);
