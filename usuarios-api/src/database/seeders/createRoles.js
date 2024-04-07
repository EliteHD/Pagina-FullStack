module.exports = async function createRoles(sequelize) {
  const { DataTypes } = require('sequelize');

  const Rol = sequelize.define("rol", {
    nombre: {
      type: DataTypes.STRING
    },
    descripcion: {
      type: DataTypes.STRING
    }
  });

  try {
    const rolesToCreate = [
      { nombre: 'administrador', descripcion: 'Rol de administrador' },
      { nombre: 'usuario', descripcion: 'Rol de usuario' },
      { nombre: 'nuevoRol', descripcion: 'Nuevo rol agregado' },
      { nombre: 'nuevoRol2', descripcion: 'Nuevo rol agregado'},
      { nombre: 'nuevoRol3', descripcion: 'Nuevo rol agregado' },

    ];

    const existingRoles = await Rol.findAll();

    const rolesToInsert = rolesToCreate.filter(role => {
      return !existingRoles.some(existingRole => existingRole.nombre === role.nombre);
    });

    await Rol.bulkCreate(rolesToInsert);

    console.log("Roles created successfully.");
  } catch (error) {
    console.error("Error creating roles:", error);
    throw error;
  }
};
