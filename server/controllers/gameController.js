// Funções utilitárias para o Sudoku
const verificarQuadrante = (tabuleiro, linhaInicio, colunaInicio) => {
    const conjunto = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            conjunto.push(tabuleiro[linhaInicio + i][colunaInicio + j]);
        }
    }
    return conjunto;
};

const eConjuntoValido = (conjunto) => {
    const visto = {};
    for (const valor of conjunto) {
        if (valor !== "" && visto[valor]) return false;
        const num = parseInt(valor);
        if (valor !== "" && (num < 1 || num > 9)) return false;
        if (valor !== "") visto[valor] = true;
    }
    return true;
};

const eTabuleiroValido = (tabuleiro) => {
    for (let i = 0; i < 9; i++) {
        const linha = tabuleiro[i];
        const coluna = tabuleiro.map(linha => linha[i]);
        if (!eConjuntoValido(linha) || !eConjuntoValido(coluna)) return false;
    }

    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            const bloco = verificarQuadrante(tabuleiro, i, j);
            if (!eConjuntoValido(bloco)) return false;
        }
    }

    return true;
};

const preencherDiagonalPrincipal = (tabuleiro) => {
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    numeros.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 9; i++) {
        tabuleiro[i][i] = numeros[i];
    }
};

const podeColocarNumero = (tabuleiro, linha, coluna, num) => {
    for (let i = 0; i < 9; i++) {
        if (tabuleiro[linha][i] === num || tabuleiro[i][coluna] === num) {
            return false;
        }
    }
    const linhaInicio = Math.floor(linha / 3) * 3;
    const colunaInicio = Math.floor(coluna / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tabuleiro[linhaInicio + i][colunaInicio + j] === num) {
                return false;
            }
        }
    }
    return true;
};

const preencherRestante = (tabuleiro, linha, coluna) => {
    if (linha === 9) {
        return true;
    }
    if (coluna === 9) {
        return preencherRestante(tabuleiro, linha + 1, 0);
    }
    if (tabuleiro[linha][coluna] !== "") {
        return preencherRestante(tabuleiro, linha, coluna + 1);
    }
    for (let num = 1; num <= 9; num++) {
        if (podeColocarNumero(tabuleiro, linha, coluna, num)) {
            tabuleiro[linha][coluna] = num;
            if (preencherRestante(tabuleiro, linha, coluna + 1)) {
                return true;
            }
            tabuleiro[linha][coluna] = "";
        }
    }
    return false;
};

const ocultarNumeros = (tabuleiro, dificuldade) => {
    let celulasParaRemover;
    switch (dificuldade) {
        case 'facil':
            celulasParaRemover = 20;
            break;
        case 'medio':
            celulasParaRemover = 40;
            break;
        case 'dificil':
            celulasParaRemover = 50;
            break;
        case 'infernal':
            celulasParaRemover = 60;
            break;
        default:
            celulasParaRemover = 40;
    }

    while (celulasParaRemover > 0) {
        const i = Math.floor(Math.random() * 9);
        const j = Math.floor(Math.random() * 9);
        if (tabuleiro[i][j] !== "") {
            tabuleiro[i][j] = "";
            celulasParaRemover--;
        }
    }
};

const gerarSudoku = (dificuldade) => {
    const tabuleiro = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ""));
    preencherDiagonalPrincipal(tabuleiro);
    preencherRestante(tabuleiro, 0, 3);
    ocultarNumeros(tabuleiro, dificuldade);
    return tabuleiro;
};

const iniciarJogo = (req, res) => {
    const { dificuldade } = req.body;
    const tabuleiro = gerarSudoku(dificuldade);
    res.json({ tabuleiro });
};

const validarJogo = (req, res) => {
    const { tabuleiro } = req.body;
    const valido = eTabuleiroValido(tabuleiro);
    res.json({ valido });
};

module.exports = {
    iniciarJogo,
    validarJogo
};
