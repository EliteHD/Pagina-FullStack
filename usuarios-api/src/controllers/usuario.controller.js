const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const express = require("express");
const path = require('path');
const moment = require('moment');
const Usuario = db.usuario;
const Rol = db.rol;
const app = express();

exports.create = async (req, res) => {
  try {
    const { nombre, apepat, apemat, correo, telefono, contrasenia, birthdate, rol_id } = req.body;

    // Verificar si el correo ya está registrado
    const existingUser = await Usuario.findOne({ where: { correo } });
    if (existingUser) {
      return res.status(400).send({ mensaje: "El correo ya está registrado" });
    }

    // Hash de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    // Crear el usuario en la base de datos
    const usuario = await Usuario.create({
      nombre,
      apepat,
      apemat,
      correo,
      telefono,
      contrasenia: hashedPassword,
      birthdate,
      rol_id,
    });

    res.status(201).send(usuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).send({ mensaje: "Ocurrió un error al crear el usuario" });
  }
};

// Recuperar todos los Usuarios de la base de datos
// exports.findAll = async (req, res) => {
//   try {
//     // Incluye la información del rol en la consulta
//     const usuarios = await Usuario.findAll({
//       include: {
//         model: Rol,
//       },
//     });
//     res.status(200).send(usuarios);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({
//       mensaje: err.message || "Ocurrió un error al recuperar todos los usuarios."
//     });
//   }
// };
exports.findAll = async (req, res) => {
  try {
    // Realiza una operación de "join" para obtener los usuarios con sus roles correspondientes
    const usuarios = await Usuario.findAll({
      include: Rol, // Incluye el modelo Rol para obtener los datos del rol asociado
    });

    // Verifica si se encontraron usuarios
    if (usuarios.length === 0) {
      return res.status(404).send({ mensaje: "No se encontraron usuarios." });
    }

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
      res.send({ mensaje: `${nums} Usuarios eliminados con exito!` });
    })
    .catch(err => {
      res.status(500).send({
        mensaje:
          err.message || "Ocurrio un error al eliminar todos los Usuarios."
      });
    });
};



