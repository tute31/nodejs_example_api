'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La petición no tiene token'});
    } 

    var token = req.headers.authorization.replace(/['"]+/g, ''); // sacar las comillas que vengan en el token

    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'token expirado'});
        }
    } catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'token no válido'});
    }

    req.user = payload;

    next();
};