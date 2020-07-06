'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = Schema({
    name: String,
    surname: String,
    description: String,
    number: String,
    age: Number,
    team: { type: Schema.ObjectId, ref: 'Team'},
    image: String,
});

// { type: Schema.ObjectId, ref: 'Team'}

module.exports = mongoose.model('Player', PlayerSchema);