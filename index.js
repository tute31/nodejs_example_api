'use strict'
 
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080; // definido el puerto local https://localhost:8080
//app.set( 'port', ( process.env.PORT || 8080 ));

var MONGODB_LOCAL_URI = 'mongodb://localhost:27017/testDataBase';
var MONGODB_URI = "mongodb://mramos:mramos@node-test-database-shard-00-00-mhixb.mongodb.net:27017,node-test-database-shard-00-01-mhixb.mongodb.net:27017,node-test-database-shard-00-02-mhixb.mongodb.net:27017/test?ssl=true&replicaSet=node-test-database-shard-0&authSource=admin&retryWrites=true&w=majority";


// CONEXION BASE DE MONGO
mongoose.connect(MONGODB_URI,{useNewUrlParser: true },(err,res) => {
    if(err){
        throw err;
    } else {
        console.log("Base de Datos corriendo corectamente...");

        app.listen(port, function(){
            console.log("Servidor API REST en Puerto: " + port);
        });

       /* app.listen(app.get( 'port' ), function(){
            console.log("Servidor API REST en Puerto: " + port);
        });*/
    }
});