const schemaProducto = require("../models/schemas/productos");

class ProductoDao {
    
    getAll(){
        return schemaProducto.find();
    }

    getById(id){
        return schemaProducto.find({}, {"_id": id});
    }

    create(producto){
        return schemaProducto.create({
            ...producto
        });
    }

    update(producto){
        let productoUpdate = schemaProducto.find({}, {"_id": producto.id});
        return productoUpdate.update(...producto);
    }


}

module.exports = { ProductoDao }