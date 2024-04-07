const db = require('../models');
const Usuario = db.usuario;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { nombre, apepat, apemat, correo, telefono, contrasenia, birthdate } = req.body;

    try {
        const userExists = await Usuario.findOne({ where: { correo } });
        if (userExists) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const passwordHash = await bcrypt.hash(contrasenia, 10);
        const newUser = await Usuario.create({
            nombre,
            apepat,
            apemat,
            correo,
            telefono,
            contrasenia: passwordHash,
            birthdate
        });

        jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET || 'secretjos',
            { expiresIn: 3600 },
            (err, token) => {
                if (err) console.error(err);
                res.cookie('token', token);

                res.json({
                    token,
                    id: newUser.id,
                    correo: newUser.correo,
                    nombre: newUser.nombre
                });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

const login = async (req, res) => {
    const { correo, contrasenia } = req.body;

    try {
        const user = await Usuario.findOne({ where: { correo } });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario no existe' });
        }

        const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña inválida' });
        }

        jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'secretjos',
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token);
                res.json({
                    token,
                    id: user.id,
                    correo: user.correo,
                    nombre: user.nombre
                });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

const logout = (req, res) => { 
    res.clearCookie('token');
    res.json({ msg: 'Logout exitoso' });
};

const profile = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.user.id);
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

        return res.json({
            id: user.id,
            correo: user.correo,
            nombre: user.nombre
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener perfil' });
    }
};

module.exports = { register, login, logout, profile };
