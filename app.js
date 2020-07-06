'use strict'

var express    = require('express');    // Utilizaremos express, aqui lo mandamos llamar

var app        = express();             // definimos la app usando express
var bodyParser = require('body-parser');

// cargar ruta
var user_routes = require('./routes/user');
var team_routes = require('./routes/team');
var categoria_routes = require('./routes/categoria');

// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');

    next();
});


// RUTAS BASE
/* user */
app.use('/api', user_routes);

/* team */
app.use('/api', team_routes);

/* categoria */
app.use('/api', categoria_routes);

module.exports = app;