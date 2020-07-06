'use strict'

var fs = require('fs');
var path = require('path');

// MODELOS DE DATOS 
var User = require('../models/user');

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

// FUNCIONES DEL CONTROLADOR

/* listado de todos los usuarios */
function getUsers(req, res) {
    User.find((err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error al buscar usuario..'
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: 'no se encotró usuarios..'
                });
            } else {
                res.status(200).send({
                    user
                });
            }
        }
    });
}

/* guardar un usuario */
function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    // mapeo
    user.name = params.name;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if (params.password) {
        // encriptar constraseña y guardar datos
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if (user.name != null && user.email != null) {
                // guardar el usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al guardar el usuario..'
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: 'No se registro el usuario..'
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    message: 'introduce todos los campos..'
                });
            }
        });
    } else {
        res.status(200).send({
            message: 'introduce contraseña..'
        });
    }

}

/* eliminar un usuario por id */
function deleteUser(req, res) {
    var userId = req.params.id

    User.findByIdAndDelete(userId, (err, userStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al eliminar usuario'
            });
        } else {
            if (!userStored) {
                res.status(404).send({
                    message: 'Error al eliminar'
                });
            } else {
                res.status(200).send({
                    userStored
                });
            }
        }
    });

}

/* login de usuario por mail y password */
function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: 'Usuario no existe'
                });
            } else {
                //comprobar la contraseña
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        //devolver usuario loggeado
                        if (params.gethash) {
                            //devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({
                                user
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: 'Usuario no pudo loguearse'
                        });
                    }
                });
            }
        }
    });
}

/* actualizar datos de un usuario */
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar usuario'
            });
        } else {
            if (!userUpdated) {
                res.status(404).send({
                    message: 'no se ha podido actualizar'
                });
            } else {
                res.status(200).send({
                    message: 'Usuario correctamente actualizado'
                });
            }
        }
    });

}

/* subir una imagen */
function uploadImage(req, res) {
    var userId = req.params.id;
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
            User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(404).send({
                        message: 'no se ha podido actualizar la imagen'
                    });
                } else {
                    res.status(200).send({
                        image: file_name,
                        user: userUpdated
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
function getImageFile(req, res) {
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
    getUsers,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile,
    deleteUser
};