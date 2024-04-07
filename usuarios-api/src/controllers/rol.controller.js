const db = require("../models");
const Rol = db.rol;
const Op = db.Sequelize.Op;
var path = require('path');

// Crear y Guardar un nuevo Rol
exports.create = (req, res) => {
    // Validar request
    if (!req.body.nombre) {
        res.status(400).send({
            mensaje: "El contenido no puede ser vacio, nombre=" + req.body.nombre + " descripcion=" + req.body.descripcion
        });
        return;
    }

    // Crear un Rol
    const rol = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    };

    // Guardar Rol en la base de datos
    Rol.create(rol)
        .then(rol => {
            res.status(200).send(rol);
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.message || "Ocurrio un error al crear Rol."
            });
            //res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
        });
};

// Recuperar todos los Roles de la base de datos
exports.findAll = (req, res) => {
    Rol.findAll()
        .then(rol => {
            res.status(200).send(rol);
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.message || "Ocurrio un error al recuperar todos los Roles."
            });
        });
};

// Encontrar Rol por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Rol.findByPk(id)
        .then(rol => {
            res.status(200).send(rol);
        })
        .catch(err => {
            res.status(500).send({
                mensaje: "Error al recuperar Rol por id=" + id
            });
        });
};
// Actualizar Rol por id
exports.update = (req, res) => {
    const id = req.params.id;
    Rol.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    mensaje: "Rol se actualizo con exito."
                });
            } else {
                res.send({
                    mensaje: `Error al actualizar Rol con id=${id}!`
                });
                //res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
            }
        })
        .catch(err => {
            res.status(500).send({
                mensaje: "Error al actualizar Rol con id=" + id
            });
            //res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
        });
};

// Eliminar un Rol por id
exports.delete = (req, res) => {
    const id = req.params.id;
    Rol.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    mensaje: "Rol eliminado con exito!"
                });
            } else {
                res.send({
                    mensaje: `Error al eliminar Rol con id=${id}!`
                });
                //res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
            }
        })
        .catch(err => {
            res.status(500).send({
                mensaje: "Error al eliminar Rol con id=" + id
            });
            //res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
        });
};

// Eliminar todos los Rol de la base de datos
exports.deleteAll = (req, res) => {
    Rol.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.status(200).send({ mensaje: `${nums} Roles fueron eliminados con exito!` });
        })
        .catch(err => {
            res.status(500).send({
                mensaje:
                    err.message || "Error al eliminar Roles."
            });
            //res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
        });
};
