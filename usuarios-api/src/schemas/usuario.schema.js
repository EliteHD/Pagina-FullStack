const { z } = require('zod');

const usuarioSchema = z.object({
    nombre: z.string().min(1, {
        message: "Nombre is required"
    }),
    apepat: z.string().min(1, {
        message: "Apellido Paterno is required"
    }),
    apemat: z.string().min(1, {
        message: "Apellido Materno must be at least 1 character long"
    }).or(z.undefined()),
    correo: z.string().email({
        message: "Correo must be a valid email"
    }),
    telefono: z.string().min(4, {
        message: "Telefono must be at least 10 digits long"
    }).or(z.undefined()),
    contrasenia: z.string().min(6, {
        message: "Contraseña must be at least 6 characters long"
    }),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Birthdate must be in YYYY-MM-DD format"
    }).or(z.undefined()),
});


module.exports = usuarioSchema;
