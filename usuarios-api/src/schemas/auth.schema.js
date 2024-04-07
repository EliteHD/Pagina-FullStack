const { z } = require('zod');

const registerSchema = z.object({
    nombre: z.string({
        required_error: 'Nombre is required'
    }),
    apepat: z.string({
        required_error: 'Apellido Paterno is required'
    }),
    apemat: z.string().min(1, {
        message: "Apellido Materno must be at least 1 character long"
    }).or(z.undefined()),
    correo: z.string({
        required_error: 'Correo is required'
    }).email({
        message: 'Correo must be a valid email'
    }),
    telefono: z.string().min(10, {
        message: "Telefono must be at least 10 digits long"
    }).or(z.undefined()),
    contrasenia: z.string({
        required_error: 'Contraseña is required'
    }).min(6, {
        message: 'Contraseña must be at least 6 characters long'
    }),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Birthdate must be in YYYY-MM-DD format"
    }).or(z.undefined()),
});

const loginSchema = z.object({
    correo: z.string({
        required_error: 'Correo is required'
    }).email({
        message: 'Correo must be a valid email'
    }),
    contrasenia: z.string({
        required_error: 'Contraseña is required'
    }).min(6, {
        message: 'Contraseña must be at least 6 characters long'
    })
});

module.exports = { registerSchema, loginSchema };
