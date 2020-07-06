'use strict'

var express = require('express');   // UTILIZANDO EXPRESS
var api = express.Router();

var TeamController = require('../controller/team'); // TRAIGO EL CONTROLADOR SELECCIONADO(TEAM)

var md_auth = require('../middleware/authenticated');   // MIDDLEWARE TOKEN

var multipart = require('connect-multiparty');  // UTILIZANDO MULTIPART
var md_upload = multipart({uploadDir: './uploads/users'});  // MIDDLEWARE IMAGEN


/// GET
api.get('/team/:id', md_auth.ensureAuth, TeamController.getTeam);   // TRAER EL EQUIPO POR ID
api.get('/teams', TeamController.getTeams);                         // TRAER TODOS LOS EQUIPOS
api.get('/get-image-user/:imageFile', TeamController.getTeamImageFile); // TRAER LA IMAGEN POR RUTA DEL ARCHIVO
api.get('/teamsCategoria/:id', TeamController.getTeamsCategoria);   // TRAER EQUIPOR POR CATEGORIA

/// POST
api.post('/team', TeamController.saveTeam); // GUARDAR UN EQUIPO
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], TeamController.uploadTeamImage); // GUARDAR UNA IMAGEN POR ID DE EQUIPO

/// PUT

/// DELETE
api.delete('/team/:id', TeamController.deleteTeam); // BORRAR UN EQUIPO

module.exports = api