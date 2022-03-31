const schemaProducto = require("../models/ModelProducto");
const mongoose = require("mongoose");

class ProductoDao {
    
    getAll(){
        return schemaProducto.find();
    }

    getById(id){
        return schemaProducto.findById(id);
    }

    create(productoNew){
        let productoCreated = schemaProducto.create({...productoNew});
        return productoCreated;
    }

    async update(id, producto){
        await schemaProducto.updateOne({ _id: id },{ ...producto });
        return schemaProducto.findById(id);
    }

    async delete(id) {
        await schemaProducto.findByIdAndDelete(id);
    }
}

module.exports = { ProductoDao }