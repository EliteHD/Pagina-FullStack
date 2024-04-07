const db = require('../../models'); // Importa el modelo de Usuario y Rol
const Rol = db.rol;

module.exports = async function createRoles() {
  try {
    // Define los roles que deseas crear
    const rolesToCreate = [
      { nombre: 'administrador', descripcion: 'Rol de administrador' },
      { nombre: 'usuario', descripcion: 'Rol de usuario' },
    ];

    // Verifica si cada rol ya existe en la base de datos
    const existingRoles = await Rol.findAll({ where: { nombre: rolesToCreate.map(role => role.nombre) } });

    // Filtra los roles que no existen en la base de datos
    const newRolesToCreate = rolesToCreate.filter(role => !existingRoles.find(existingRole => existingRole.nombre === role.nombre));

    if (newRolesToCreate.length === 0) {
      console.log("No new roles to create.");
      return;
    }

    // Crea los roles nuevos en la base de datos
    await Rol.bulkCreate(newRolesToCreate);
    console.log("\n::::::::::::::::::::::::::::::::::::");
    console.log("New roles created successfully.");
    console.log("::::::::::::::::::::::::::::::::::::");

    
  } catch (error) {
    console.error("Error creating roles:", error);
    throw error;
  }
};
