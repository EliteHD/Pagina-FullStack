const isAdmin = require("../middleware/isAdmin.js");
const authRequired = require("../middleware/validateToken.js");

module.exports = app => {
    const rol = require("../controllers/rol.controller.js");
    var router = require("express").Router();

    router.post("/rol", authRequired, isAdmin, rol.create); //http://localhost:9595/api/rol
    router.put("/rol/:id", authRequired, isAdmin, rol.update); //http://localhost:9595/api/rol/[id]

    router.get("/roles", authRequired, isAdmin, rol.findAll); //http://localhost:9595/api/roles/
    router.get("/rol/:id", authRequired, isAdmin, rol.findOne); //http://localhost:9595/api/rol/[id]

    router.delete("/rol/:id", authRequired, isAdmin, rol.delete); //http://localhost:9595/api/rol/[id]
    router.delete("/rolesDeleteAll", authRequired, isAdmin, rol.deleteAll); //http://localhost:9595/api/rolesAll/

    app.use('/api', router);
};
