const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { generateToken } = require('../controllers/authController');
const { jwtSecret } = require('../config/config');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sudoku_db',
    password: '12345',
    port: 5432
});

// Autenticar usuário e gerar JWT
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Username or Password Incorrect' });
        }

        const match = await bcrypt.compare(password, result.rows[0].password);

        if (!match) {
            return res.status(401).json({ success: false, message: 'Username or Password Incorrect' });
        }

        const token = generateToken(result.rows[0].username);

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { loginUser };
