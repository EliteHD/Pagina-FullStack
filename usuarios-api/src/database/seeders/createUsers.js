const bcrypt = require('bcrypt');
const db = require('../../models'); // Importa el modelo de Usuario y Rol
const Usuario = db.usuario;
const Rol = db.rol;

module.exports = async function createUsers() {
  try {
    // Define los usuarios que deseas crear
    const usersToCreate = [
      {
        nombre: 'Admin',
        apepat: 'Admin',
        apemat: 'Admin',
        correo: 'admin@example.com',
        telefono: 1234,
        contrasenia: await bcrypt.hash('admin123', 10),
        birthdate: new Date(),
        rol: 'administrador'
      },
      {
        nombre: 'Usuario',
        apepat: 'Usuario',
        apemat: 'Usuario',
        correo: 'usuario@example.com',
        telefono: 9876,
        contrasenia: await bcrypt.hash('user123', 10),
        birthdate: new Date(),
        rol: 'usuario'
      },
    ];

    // Consulta la base de datos para verificar si los usuarios ya existen
    const existingUsers = await Usuario.findAll({ where: { correo: usersToCreate.map(user => user.correo) } });
    const existingUserEmails = existingUsers.map(user => user.correo);

    // Filtra los usuarios que ya existen en la base de datos
    const newUsersToCreate = usersToCreate.filter(user => !existingUserEmails.includes(user.correo));

    if (newUsersToCreate.length === 0) {
      console.log("No new users to create.");
      return;
    }

    // Consulta la base de datos para verificar si los roles existen
    const existingRoles = await Rol.findAll({ where: { nombre: newUsersToCreate.map(user => user.rol) } });
    const existingRolesNames = existingRoles.map(role => role.nombre);

    // Verifica la existencia de cada rol y asigna el ID del rol correspondiente al usuario
    newUsersToCreate.forEach(user => {
      if (!existingRolesNames.includes(user.rol)) {
        console.log("\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        console.log(`El rol '${user.rol}' no existe en la base de datos. El usuario '${user.nombre}' no será creado.`);
        console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");

        return;
      }

      const roleId = existingRoles.find(role => role.nombre === user.rol).id;
      user.rol_id = roleId;
    });

    // Filtra los usuarios que tienen un ID de rol asignado
    const validUsersToCreate = newUsersToCreate.filter(user => user.rol_id);

    if (validUsersToCreate.length === 0) {
      console.log("No new valid users to create.");
      return;
    }

    // Crea los usuarios nuevos en la base de datos
    await Usuario.bulkCreate(validUsersToCreate);

    console.log("New users created successfully.");
  } catch (error) {
    console.error("Error creating users:", error);
    throw error;
  }
};
