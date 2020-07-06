'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({
    name: String,
    type: String,
    cupos: String,
    teams: Array,
    image: String
});

module.exports = mongoose.model('Categoria', CategoriaSchema);