const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config/config');
const userRoutes = require('./routes/routes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas públicas
app.use('/user', userRoutes);
app.use('/', userRoutes);

// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token.split(' ')[1], jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }

    req.username = decoded.username;
    next();
  });
};

app.use('/game', verifyToken, gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
