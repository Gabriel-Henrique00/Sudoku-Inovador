const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sudoku_db',
    password: '12345',
    port: 5432
});

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const saveGameResult = async (req, res) => {
    const { username, difficulty, time, completed } = req.body;

    try {
        await pool.query('INSERT INTO game_results (username, difficulty, time, completed) VALUES ($1, $2, $3, $4)', 
                         [username, difficulty, time, completed]);
        res.status(201).json({ success: true, message: 'Game result saved successfully' });
    } catch (error) {
        console.error('Error saving game result:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getGameResultsByDifficulty = async (req, res) => {
    const { difficulty } = req.body;

    try {
        const result = await pool.query('SELECT * FROM game_results WHERE difficulty = $1 ORDER BY time ASC', [difficulty]);
        res.status(200).json({ success: true, results: result.rows });
    } catch (error) {
        console.error('Error fetching game results:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
    saveGameResult,
    getGameResultsByDifficulty
};
