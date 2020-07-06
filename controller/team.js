'use strict'

var path = require('path');
var fs = require('fs');

// MODELOS DE DATOS 
var Team = require('../models/team');
//var Player = require('../models/player');
//var Categoria = require('../models/categoria');

// FUNCIONES DEL CONTROLADOR

/* lista de equipos por id */
function getTeam(req, res) {
    var teamId = req.params.id;

    Team.findById(teamId, (err, team) => {
        if (err) {
            res.status(500).send({
                message: 'Error al econtrar el equipo'
            });
        } else {
            if (!team) {
                res.status(404).send({
                    message: 'no existe artista'
                });
            } else {
                res.status(200).send({
                    team
                });
            }
        }
    });
}

/* lista de todod equipos */
function getTeams(req, res) {
    Team.find((err, team) => {
        if (err) {
            res.status(500).send({
                message: 'Error al econtrar el equipo'
            });
        } else {
            if (!team) {
                res.status(404).send({
                    message: 'no existe artista'
                });
            } else {
                res.status(200).send({
                    team
                });
            }
        }
    });
}

/* lista de todod equipos por Categoria */
function getTeamsCategoria(req, res) {
    var categoriaId = req.params.id;

    Team.find({
        categoriaId: categoriaId
    }, (err, team) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!team) {
                res.status(404).send({
                    message: 'Equipo no existe'
                });
            } else {
                res.status(200).send({
                    team
                });
            }
        }
    });
}

/* guardar un equipo */
function saveTeam(req, res) {
    var team = new Team();

    // mapeo
    var params = req.body;
    team.name = params.name;
    team.type = params.type;
    team.jugadores = params.jugadores;
    team.posicion = params.posicion;
    team.image = 'null';
    team.categoriaId = params.categoriaId

    team.save(team,(err, teamStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el Equipo'
            });
        } else {
            if (!teamStored) {
                res.status(404).send({
                    message: 'No guardo el equipo'
                });
            } else {
                res.status(200).send({
                    team: team
                });
            }
        }
    });
}

/* eliminar un equipo por id */
function deleteTeam(req, res) {
    var teamId = req.params.id;

    Team.findByIdAndDelete(teamId, (err, teamRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error al eliminar'
            });
        } else {
            if (!teamRemoved) {
                res.status(404).send({
                    message: 'No se puddo eliminar'
                });
            } else {
                res.status(200).send({
                    teamRemoved
                });
            }
        }
    });
}

/* subir una imagen del Equipo */
function uploadTeamImage(req, res) {
    var TeamId = req.params.id;
    var file_name = 'No subido..';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        //para obtener la extension del archivo
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1]
        //console.log(ext_split);

        // filtra la extension por png o jpg 
        if (file_ext == 'png' || file_ext == 'jpg') {
            Team.findByIdAndUpdate(TeamId, { image: file_name }, (err, teamUpdated) => {
                if (!teamUpdated) {
                    res.status(404).send({
                        message: 'no se ha podido actualizar la imagen'
                    });
                } else {
                    res.status(200).send({
                        image: file_name,
                        team: teamUpdated
                    });
                }
            });
        } else {
            res.status(200).send({
                message: 'extension archivo no válida'
            });
        }
    } else {
        res.status(200).send({
            message: 'No has subido la imagen'
        });
    }
}

/* obtener la imagen */
function getTeamImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: 'No existe la imagen'
            });
        }
    });
}

// EXPORTAR FUNCIONES
module.exports = {
    getTeam,
    getTeams,
    saveTeam,
    deleteTeam,
    uploadTeamImage,
    getTeamImageFile,
    getTeamsCategoria
};