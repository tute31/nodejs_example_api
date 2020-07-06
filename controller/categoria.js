'use strict'

var path = require('path');
var fs = require('fs');

// MODELOS DE DATOS 
var Team = require('../models/team');
var Player = require('../models/player');
var Categoria = require('../models/categoria');

/// FUNCIONES DEL CONTROLADOR

/* guardar una Categoria */
function saveCategoria(req, res) {
    var categoria = new Categoria();

    var params = req.body;
    categoria.name = params.name;
    categoria.type = params.type;
    categoria.cupos = params.cupos;
    categoria.teams = params.teams;
    categoria.image = 'null';

    categoria.save((err, categoriaStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar categoría'
            });
        } else {
            if (!categoriaStored) {
                res.status(404).send({
                    message: 'No guardo la categoría'
                });
            } else {
                res.status(200).send({
                    categoria: categoriaStored
                });
            }
        }
    });

}

/* listado de las Categorias */
function getCategorias(req, res) {
    Categoria.find((err, categoria) => {
        if (err) {
            res.status(500).send({
                message: 'Error al buscar categoría'
            });
        } else {
            if (!categoria) {
                res.status(404).send({
                    message: 'no existe categoría'
                });
            } else {
                res.status(200).send({
                    categoria
                });
            }
        }
    });
}

/* eliminar categoria */
function deleteCategoria(req, res) {
    var categoriaId = req.params.id;

    Categoria.findByIdAndDelete(categoriaId, (err, categoriaRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error al eliminar'
            });
        } else {
            if (!categoriaRemoved) {
                res.status(404).send({
                    message: 'No se puddo eliminar'
                });
            } else {
                res.status(200).send({
                    categoriaRemoved
                });
            }
        }
    });
}


// EXPORTAR FUNCIONES
module.exports = {
    getCategorias,
    saveCategoria,
    deleteCategoria
};