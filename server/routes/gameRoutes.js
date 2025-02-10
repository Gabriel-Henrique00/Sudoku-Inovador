const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const resultController = require('../controllers/resultController');

router.post('/iniciar-jogo', gameController.iniciarJogo);
router.post('/validar-jogo', gameController.validarJogo);

router.post('/result', resultController.saveGameResult);
router.post('/ranking', resultController.getGameResultsByDifficulty);

module.exports = router;
