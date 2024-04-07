const { exec } = require('child_process');

const seederController = {
  seeder: async (req, res) => {
    const seederName = req.params.seederName;
    const command = `node src/database/seeder.js ${seederName}`;

    try {
      const { stdout, stderr } = await executeCommand(command);
      console.log(`Seeder executed successfully: ${stdout}`);
      res.send(`Seeder executed successfully`);
    } catch (error) {
      console.error(`Error executing seeder: ${error.message}`);
      res.status(500).send(`Error executing seeder: ${error.message}`);
    }
  },
};

async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

module.exports = seederController;
