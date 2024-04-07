
const usuarioSchema = require("../schemas/usuario.schema.js");
module.exports = app => {
    
    const usuario = require("../controllers/usuario.controller.js");
    var router = require("express").Router();
    const express = require("express");
    const authRequired = require('../middleware/validateToken');
    const validatorSchema = require('../middleware/validator.middleware');

    
    router.post("/usuario", authRequired, validatorSchema(usuarioSchema), usuario.create); http://localhost:9595/api/usuario
    router.put("/usuarios/:id", authRequired, usuario.update); //http://localhost:9595/api/usuarios/1

    router.get("/usuarios/", authRequired, usuario.findAll); //http://localhost:9595/api/usuarios/
    router.get("/usuarios/:id", authRequired, usuario.findOne); //http://localhost:9595/api/usuarios/1

    router.delete("/usuarios/:id", authRequired, usuario.delete); //http://localhost:9595/api/usuarios/1
    router.delete("/usuarios/eliminar", authRequired, usuario.deleteAll);
    
    router.post('/registrar', usuario.create); //http://localhost:9595/api/usuario/registrar

    app.use('/api', router);
}