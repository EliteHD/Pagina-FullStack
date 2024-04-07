
const isAdmin = require("../middleware/isAdmin.js");
const usuarioSchema = require("../schemas/usuario.schema.js");
module.exports = app => {

    const usuario = require("../controllers/usuario.controller.js");
    var router = require("express").Router();
    const express = require("express");
    const authRequired = require('../middleware/validateToken');
    const validatorSchema = require('../middleware/validator.middleware');


    router.post("/usuario", authRequired, isAdmin, validatorSchema(usuarioSchema), usuario.create); //http://localhost:9595/api/usuario
    router.put("/usuarios/:id", authRequired, isAdmin, usuario.update); //http://localhost:9595/api/usuarios/1

    router.get("/usuarios/", authRequired, isAdmin, usuario.findAll); //http://localhost:9595/api/usuarios/
    router.get("/usuarios/:id", authRequired, isAdmin, usuario.findOne); //http://localhost:9595/api/usuarios/1

    router.delete("/usuarios/:id", authRequired, isAdmin, usuario.delete); //http://localhost:9595/api/usuarios/1
    router.delete("/usuariosDeleteAll", authRequired, isAdmin, usuario.deleteAll); //http://localhost:9595/api/usuarios/deleteAll

    //router.post('/registrar', usuario.create); //http://localhost:9595/api/usuario/registrar

    app.use('/api', router);
}