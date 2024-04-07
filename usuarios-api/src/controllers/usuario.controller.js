const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const express = require("express");
const path = require('path');
const moment = require('moment');
const Usuario = db.usuario;
const app = express();
app.set("llave", config.llave);

// Crear y Guardar un nuevo Usuario
exports.create = (req, res) => {
  Usuario.findOne({ where: { correo: req.body.correo } })
    .then(usuario => {
      if (usuario) {
        res.status(400).send({
          mensaje: "Correo existente"
        });
        return;
      } else {
        const passwordHash = bcrypt.hashSync(req.body.contrasenia, 10);

        const usuario = {
          correo: req.body.correo,
          contrasenia: passwordHash,
          estatus: req.body.estatus,
          fechaRegistro: req.body.fechaRegistro,
          fechaVigencia: req.body.fechaVigencia,
          persona_id: req.body.persona_id,
          rol_id: req.body.rol_id
        };

        Usuario.create(usuario)
          .then(usuario => {
            res.status(200).send(usuario);
          })
          .catch(err => {
            res.status(500).send({
              mensaje:
                err.message || "Ocurrio un error al crear Rol."
            });
            //res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        mensaje: "Error al recuperar Usuario por correo"
      });
    });
};




// Recuperar todos los Usuarios de la base de datos
exports.findAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).send(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      mensaje: err.message || "Ocurrió un error al recuperar todos los usuarios."
    });
  }
};


// //Buscar Usuario por Id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Usuario.findByPk(id, {
    include: [
      {
        model: db.rol,
      },
    ],
  })
    .then(usuario => {
      res.status(200).send(usuario);
    })
    .catch(err => {
      res.status(500).send({
        mensaje: "Error al recuperar Usuarios por id=" + id
      });
    });
};

// //Buscar Usuario por Id
// exports.findOne = async (req, res) => {
//   try {
//     const usuario = await Usuario.findByPk(req.params.id);
//     if (!usuario) {
//       return res.status(404).send({ mensaje: "Usuario no encontrado" });
//     }
//     res.status(200).send(usuario);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({
//       mensaje: "Error al recuperar Usuario por id=" + req.params.id
//     });
//   }
// };

// Actualizar Usuario por Id
exports.update = async (req, res) => {
  const id = req.params.id;
  let datos = req.body;

  if (datos.contrasenia) {
    datos.contrasenia = await bcrypt.hash(datos.contrasenia, 10);
  }

  try {
    const [updated] = await Usuario.update(datos, { where: { id: id } });
    if (updated) {
      const usuarioActualizado = await Usuario.findByPk(id);
      res.status(200).send(usuarioActualizado);
    } else {
      res.status(404).send({ mensaje: "Usuario no encontrado." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
  }
};


// Eliminar un Usuario por id
exports.delete = (req, res) => {
  const id = req.params.id;

  Usuario.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          mensaje: " Usuario eliminado con exito!"
        });
      } else {
        res.send({
          mensaje: `Error al eliminar Usuarios con id=${id}!`
        });
        //res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
      }
    })
    .catch(err => {
      res.status(500).send({
        mensaje: "Error al eliminar Usuarios con id=" + id
      });
      //res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
    });
};

// Eliminar todos los Usuarios de la base de datos
exports.deleteAll = (req, res) => {
  Usuario.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.status(200).send({ mensaje: `${nums} Usuarios fueron eliminados con exito!` });
    })
    .catch(err => {
      res.status(500).send({
        mensaje:
          err.message || "Error al eliminar Usuarios."
      });
      //res.status(500).sendFile(path.join(__dirname, '../source/img', 'error.png'));
    });
};

