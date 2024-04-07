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
        // Asegúrate de incluir el modelo Rol en la consulta para tener acceso a la información del rol
        const user = await Usuario.findOne({
            where: { correo },
            include: [{
                model: db.rol,
            }]
        });

        if (!user) {
            return res.status(400).json({ msg: 'Usuario no existe' });
        }

        const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña inválida' });
        }
        const token = jwt.sign(
            {
                id: user.id,
                rol: user.rol
            },
            process.env.JWT_SECRET || 'secretjos',
            { expiresIn: 3600 }
        );

        res.cookie('token', token, { httpOnly: true }); 
        res.json({
            token,
            usuario: {
                id: user.id,
                correo: user.correo,
                nombre: user.nombre,
                rol: user.rol
            }
        });
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
        const user = await Usuario.findByPk(req.user.id, {
            include: [{
                model: db.rol,
            }]
        });
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
        return res.json({
            id: user.id,
            correo: user.correo,
            nombre: user.nombre,
            apepat: user.apepat,
            apemat: user.apemat,
            telefono: user.telefono,
            birthdate: user.birthdate,
            rol: user.rol 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener perfil' });
    }
};



const refresh = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: 'No autorizado' });
    }
    jwt.verify(token, process.env.JWT_SECRET || 'secretjos', (err, user) => {
        if (err) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secretjos', { expiresIn: 3600 });
        res.cookie('token', newToken, { httpOnly: true });
        res.json({ token: newToken });
    });
};


module.exports = { register, login, logout, profile, refresh };
