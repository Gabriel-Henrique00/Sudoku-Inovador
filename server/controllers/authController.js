const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

// Gerar Token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
};

// Verificar e decodificar o Token JWT
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
