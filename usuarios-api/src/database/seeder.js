// Require la configuración de la base de datos
const dbConfig = require('../../config/db.config');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

// Importa los seeders
const seeders = {
  createRoles: require("./seeders/createRoles"),
  createUsers: require("./seeders/createUsers") // Importa el seeder createUsers
};

// Función para ejecutar el seeder
async function seeder(seederName) {
  if (!seeders[seederName]) {
    console.error("Seeder not found.");
    process.exit(1);
  }

  try {
    await seeders[seederName](sequelize); // Pasa la instancia de Sequelize al seeder
  } catch (error) {
    console.error("Error executing the seeder:", error);
  } finally {
    process.exit();
  }
}

// Obtén el nombre del seeder de los argumentos de la línea de comandos
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Please provide a valid seeder name as an argument.");
  process.exit(1);
}

// Ejecuta la función seeder con el nombre del seeder proporcionado
seeder(args[0]);
