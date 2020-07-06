'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = Schema({
    name: String,
    type: String,
    jugadores: Array,
    posicion: String,
    categoriaId: { type: Schema.ObjectId, ref: 'Categoria'},
    image: String
});

module.exports = mongoose.model('Team', TeamSchema);