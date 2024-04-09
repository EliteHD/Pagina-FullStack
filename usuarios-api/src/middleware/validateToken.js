const jwt = require('jsonwebtoken');

const authRequired = async (req, res, next) => {
    // Extrae el token del encabezado de autorización
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 'Bearer TOKEN_HERE'

    if (!token) {
        return res.status(401).json({ msg: 'No autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretjos');
        req.user = decoded;
        console.log(decoded);

        console.log('User data:', req.user);
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ msg: 'No autorizado' });
    }
};




module.exports = authRequired;
