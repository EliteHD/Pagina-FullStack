const usuarioSchema = require("../schemas/auth.schema");
const validatorMiddleware = require("../middleware/validator.middleware");
const authRequired = require("../middleware/validateToken");

module.exports = (app) => {
    const router = require("express").Router();
    const { loginSchema, registerSchema } = usuarioSchema;
    const { login, register, logout, profile, refresh } = require('../controllers/auth.controller');

    router.post('/register', validatorMiddleware(registerSchema), register); //http://localhost:9595/api/register
    router.post('/login', validatorMiddleware(loginSchema), login); //http://localhost:9595/api/login
    router.post('/logout', logout); //http://localhost:9595/api/logout
    router.post('/refresh', refresh); //http://localhost:9595/api/refresh

    router.get('/profile', authRequired, profile); //http://localhost:9595/api/profile

    app.use('/api', router);
};
