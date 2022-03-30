let { mongoose } = require("./config/mongoDB");
let { ProductoModel } = require("./models");

// (async () => {
//     fetch('http://localhost:3101/api/productos')
//       .then(response => response.json())
//       .then(data => productos[data]);
//   });

// const productos = [
//     {nombre:'Pedro', apellido:'Mei', edad:21, dni:'1111111', curso: '1A', nota:7, ingreso: false},
//     {nombre:'José', apellido:'Mei', edad:23, dni:'1111111', curso: '1C', nota:8, ingreso: true},
//     {nombre:'Andrés', apellido:'Mei', edad:22, dni:'222222', curso: '3A', nota:9, ingreso: false}
// ];

//Punto 1: INSERCCIÖN

(async () => {
    try {
        console.log("entrando a la función");
        let inserciones = [];
        for (const producto of productos) {
            inserciones.push(ProductoModel.create(producto));
        }
        let result = await Promise.allSettled(inserciones);
        let reject = result.filter(e => e.status == "rejected");
        if(reject.length > 0){
            console.log("Algo falló");
        }else{
            console.log("Nos fue bien");
        }
    } catch (error) {
        console.log(error);
    }
});

//PUNTO 2: LECTURA
(async()=>{
    try {
        let res = await ProductoModel.find({nombre:'Escuadra'})
        //Productos por orden alfabetico
        let resA = await ProductoModel.find({}).sort({nombre: 1})
        //Productos más barato
        let resB = await ProductoModel.find({}).sort({precio: 1, '_id': 1}).limit(1);
        //El segundo producto más barato
        let resC = await ProductoModel.find({}).sort({precio: 1, '_id': 1}).limit(1).skip(1);
        //Los productos ordeandos de la Z-A
        let resD = await ProductoModel.find({}, {nombre:1,precio:1,codigo:1}).sort({nombre: -1, '_id': 0});
        //Los productos que tienen stock en 10
        let resE = await ProductoModel.find({stock: 10}, {nombre:1,precio:1,codigo:1, '_id':1, stock:1});
        //El promedio de Stock de todos los productos
        let res_f = await ProductoModel.find({}, {stock:1, '_id':0}); 
        let resF = (res_f.reduce((prev,current) => prev + current.stock, 0))/res_f.length;
        console.log(res, resA, resB, resC, resD, resE, resF);
    } catch (error) {
        console.log(error)        
    }
});

//PUNTO 3: CRUD

(async () => {
    try {
        //1) Actualizar producto por nombre
        let res1 = await ProductoModel.updateOne({nombre: 'Blibliorato'}, {codigo:20385835}).sort({nombre:1});
        //2) Agregar campo ingreso a todos los documentos con valor false
        let res2 = await ProductoModel.updateMany({}, {$set:{"ingreso":false}});
        //3) Modificar el valor ingreso a true para todos los productos de compas
        let res3 = await ProductoModel.updateMany({'nombre':'compas'}, {$set:{"ingreso":true}});
        //4) Listar los productos que tienen más de 4 stock sin los campos _id y _v
        let res4 = await ProductoModel.find({stock: {gte:4}}, {_id: 0, __v:0});
        //5) Listar los productos que posean el campo ingreso en true sin los campos _id y _v
        let res5 = await ProductoModel.find({ingreso:true}, {_id: 0, __v:0});
        //6) Borrar de la colección los productos cuyo campo de ingreso este en true
        let res6 = await ProductoModel.deleteMany({ingreso: true});
        //7) Listar el contenido de la colección productos utilizando la consola, imprimiendio en cad caso
        //los datos almacenados (sin el campo __v) junto a su fecha de creación obtenida del ObjectID
        //en formato YYYY/MM/DD HH:mm:SS
        let res7 = await ProductoModel.find({}, {__v:0});
        res7.forEach(productos => {
            console.log(productos, new Date(productos._id.getTimestamp()).toLocaleString());
        });
        console.log(res1, res2, res3, res4, res5, res6, res7);        
    } catch (error) {
        console.log(error);        
    }
});

//Verificar en MongoDB Compass que estén los datos bien cargados.


console.log("Init...");




