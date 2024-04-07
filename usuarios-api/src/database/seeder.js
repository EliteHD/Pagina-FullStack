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

// Import the seeders
const seeders = {
  createRoles: require("./seeders/createRoles"),
  // Add other seeders here if needed
};

// Function to execute the seeder
async function seeder(seederName) {
  if (!seeders[seederName]) {
    console.error("Seeder not found.");
    process.exit(1);
  }

  try {
    await seeders[seederName](sequelize); // Pass the Sequelize instance to the seeder
    console.log("::::::::::::::::::::");
    console.log("Seeder executed successfully");
    console.log("::::::::::::::::::::");
  } catch (error) {
    console.error("Error executing the seeder:", error);
  } finally {
    process.exit();
  }
}

// Get the seeder name from command line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Please provide a valid seeder name as an argument.");
  process.exit(1);
}

// Execute the seeder function with the provided seeder name
seeder(args[0]);
