//middleware creado para verificar si el usuario es administrador y pueda crear usuario
//otra forma de implementar estas practicas es mediante el uso de roles y permisos (RBAC)

const isAdmin = (req, res, next) => {
    console.log('Checking admin role for user:', req.user);
    if (req.user && req.user.rol && req.user.rol.nombre === 'administrador') {
        next();
    } else {
        return res.status(403).json({ msg: 'Acceso denegado: requiere privilegios de administrador' });
    }
};

module.exports = isAdmin;
