const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

const saveGameResult = async (req, res) => {
    const { userId, boardDifficulty, timeTaken } = req.body;

    try {
        await pool.query("INSERT INTO ranking (user_id, difficulty, time_taken) VALUES ($1, $2, $3)", [userId, boardDifficulty, timeTaken]);

        res.status(201).json({ success: true, message: "Game registered successfully." });
    } catch (error) {
        console.error("Error saving game result: ", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

const getGameResultsByDifficulty = async (req, res) => {
    const { boardDifficulty } = req.body;
    try {
        const result = await pool.query("SELECT ranking.id, users.username, ranking.difficulty, ranking.time_taken " +
                                        "FROM ranking " +
                                        "JOIN users ON ranking.user_id = users.id " +
                                        "WHERE ranking.difficulty = $1 " +
                                        "ORDER BY ranking.time_taken", [boardDifficulty]);

        const formattedData = result.rows.map(row => ({
            id: row.id,
            username: row.username,
            difficulty: row.difficulty,
            timeTaken: row.time_taken,
            formattedTime: `${Math.floor(row.time_taken / 60)}m ${row.time_taken % 60}s`
        }));

        res.status(200).json({ success: true, rankingData: formattedData });
    } catch (error) {
        console.error("Error retrieving game results: ", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

module.exports = {
    saveGameResult,
    getGameResultsByDifficulty
};
