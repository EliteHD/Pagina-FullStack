
const jwt = require('jsonwebtoken');

function createToken(payload) {
    try {
        const token = jwt.sign(payload, process.env, JWT_SECRET || 'secretjos', {
            expiresIn: 3600
        });
        return token;
    }
    catch (err) {
        console.error(err);
        return null;
    }

}

module.exports = createToken;


