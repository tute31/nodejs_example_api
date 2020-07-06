'use strict'

var express = require('express');   // UTILIZANDO EXPRESS
var api = express.Router();

var UserController = require('../controller/user'); // TRAIGO EL CONTROLADOR SELECCIONADO(USER)

var md_auth = require('../middleware/authenticated');   // MIDDLEWARE TOKEN

var multipart = require('connect-multiparty');  // UTILIZANDO MULTIPART
var md_upload = multipart({uploadDir: './uploads/users'});  // MIDDLEWARE IMAGEN

/// GET
api.get('/getUsers', UserController.getUsers); // TRAER TODOS LOS USUARIOS
api.get('/get-image-team/:imageFile', UserController.getImageFile); // TRAER LA IMAGEN POR RUTA DEL ARCHIVO

/// POST
api.post('/register', UserController.saveUser); // GUARDAR UN USUARIO
api.post('/login', UserController.loginUser);   // HACER UN LOGIN
api.post('/upload-image-team/:id', md_upload, UserController.uploadImage);

/// PUT
api.put('/updateUser/:id', md_auth.ensureAuth, UserController.updateUser);

/// DELETE
api.delete('/deleteUser/:id', UserController.deleteUser);

module.exports = api