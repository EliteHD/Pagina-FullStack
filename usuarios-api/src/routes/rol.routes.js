const authRequired = require("../middleware/validateToken.js");

module.exports = app => {
    const rol = require("../controllers/rol.controller.js");
    var router = require("express").Router();

    router.post("/rol", authRequired, rol.create); //http://localhost:9595/api/rol
    router.put("/rol/:id", authRequired, rol.update); //http://localhost:9595/api/rol/[id]

    router.get("/roles", authRequired, rol.findAll); //http://localhost:9595/api/roles/
    router.get("/rol/:id", authRequired, rol.findOne); //http://localhost:9595/api/rol/[id]

    router.delete("/rol/:id", authRequired, rol.delete); //http://localhost:9595/api/rol/[id]
    router.delete("/rolesAll", authRequired, rol.deleteAll); //http://localhost:9595/api/rolesAll/

    app.use('/api', router);
};
