'use strict'

var express = require('express');
var CategoriaController = require('../controller/categoria');

var api = express.Router();
var md_auth = require('../middleware/authenticated');


/// GET
api.get('/categorias', CategoriaController.getCategorias);

/// POST
api.post('/saveCategoria', CategoriaController.saveCategoria);

/// PUT

/// DELETE
api.delete('/deleteCategoria/:id', CategoriaController.deleteCategoria);

module.exports = api