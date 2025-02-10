import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import RankingModal from './rankingModal';
import './sudoku.css';

const Sudoku = () => {
  const tempos = {
    facil: 900,
    medio: 1200,
    dificil: 1500,
    infernal: 2000,
  };

  const imagemPegadinha = [
    '50cent.jpg',
    'bacate.jpg',
    'normar.jpg',
    'udy2.jpeg',
    'udy3.jpg',
    'udy4.jpeg',
    'vampeta.webp',
  ];

  const [tabuleiro, setTabuleiro] = useState([]);
  const [dificuldade, setDificuldade] = useState('medio');
  const [tempoRestante, setTempoRestante] = useState(tempos['medio']);
  const [mensagem, setMensagem] = useState('');
  const [validarBotaoAtivo, setValidarBotaoAtivo] = useState(false);
  const [telaVermelhaVisivel, setTelaVermelhaVisivel] = useState(false);
  const [telaVerdeVisivel, setTelaVerdeVisivel] = useState(false);
  const [celulasEditaveis, setCelulasEditaveis] = useState([]);
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [showRankingModal, setShowRankingModal] = useState(false);
  const timerRef = useRef(null);
  const jumpscareIntervalRef = useRef(null);
  const musicaRef = useRef(null);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const iniciarJogo = async (dificuldade) => {
    try {
      const response = await axios.post('http://localhost:3000/game/iniciar-jogo', { dificuldade }, config);
      const { tabuleiro } = response.data;

      setTabuleiro(tabuleiro);
      setDificuldade(dificuldade);
      setTempoRestante(tempos[dificuldade]);
      setMensagem('');
      setValidarBotaoAtivo(false);
      setTelaVermelhaVisivel(false);
      setTelaVerdeVisivel(false);
      setJogoIniciado(true);

      const editaveis = tabuleiro.map((linha) => linha.map((valor) => valor === ''));
      setCelulasEditaveis(editaveis);

      if (musicaRef.current) {
        musicaRef.current.play();
      }

      clearInterval(timerRef.current);
      clearInterval(jumpscareIntervalRef.current);

      timerRef.current = setInterval(atualizarTimer, 1000);

      let intervalo;
      switch (dificuldade) {
        case 'facil':
          intervalo = 20000;
          break;
        case 'medio':
          intervalo = 17000;
          break;
        case 'dificil':
          intervalo = 15000;
          break;
        case 'infernal':
          intervalo = 3000;
          break;
        default:
          intervalo = 17000;
      }
      jumpscareIntervalRef.current = setInterval(exibirJumpscare, intervalo);
    } catch (error) {
      console.error('Erro ao iniciar o jogo:', error);
    }
  };

  const verificarPreenchimento = () => {
    const todosPreenchidos = tabuleiro.flat().every((valor) => valor !== '');
    setValidarBotaoAtivo(todosPreenchidos);
  };

  const handleInputChange = (linha, coluna, valor) => {
    if (!/^[1-9]$/.test(valor)) return;

    if (celulasEditaveis[linha][coluna]) {
      const novoTabuleiro = [...tabuleiro];
      novoTabuleiro[linha][coluna] = valor;
      setTabuleiro(novoTabuleiro);
      verificarPreenchimento();
    }
  };

  const validarTabuleiro = async () => {
    try {
      const response = await axios.post('http://localhost:3000/game/validar-jogo', { tabuleiro }, config);
      const { valido } = response.data;
      if (valido) {
        clearInterval(timerRef.current);
        clearInterval(jumpscareIntervalRef.current);
        setTelaVerdeVisivel(true);
        await salvarResultado();
      } else {
        setMensagem('Sudoku incorreto!');
      }
    } catch (error) {
      console.error('Erro ao validar o tabuleiro:', error);
    }
  };

  const salvarResultado = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('http://localhost:3000/result', {
        userId,
        boardDifficulty: dificuldade,
        timeTaken: tempos[dificuldade] - tempoRestante
      }, config);
      console.log(response.data.message);
    } catch (error) {
      console.error('Erro ao salvar resultado do jogo:', error);
    }
  };

  const atualizarTimer = () => {
    setTempoRestante((prevTempo) => {
      if (prevTempo <= 0) {
        clearInterval(timerRef.current);
        clearInterval(jumpscareIntervalRef.current);
        setTelaVermelhaVisivel(true);
        return 0;
      }
      return prevTempo - 1;
    });
  };

  const exibirJumpscare = () => {
    const indiceAleatorio = Math.floor(Math.random() * imagemPegadinha.length);
    const imagem = imagemPegadinha[indiceAleatorio];
    const jumpscare = document.createElement('img');
    jumpscare.src = `/images/${imagem}`;
    jumpscare.classList.add('jumpscare');
    document.body.appendChild(jumpscare);

    setTimeout(() => {
      jumpscare.remove();
    }, 500);
  };

  const jogarNovamente = () => {
    setTelaVermelhaVisivel(false);
    setTelaVerdeVisivel(false);
    setTabuleiro([]);
    setCelulasEditaveis([]);
    setJogoIniciado(false);
    if (musicaRef.current) {
      musicaRef.current.pause();
      musicaRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(jumpscareIntervalRef.current);
    };
  }, []);

  return (
    <div className="sudoku-container">
      <div id="dificuldade-container" className="dificuldade-container">
        <button onClick={() => iniciarJogo('facil')} className="btn btn-success">Fácil</button>
        <button onClick={() => iniciarJogo('medio')} className="btn btn-warning">Médio</button>
        <button onClick={() => iniciarJogo('dificil')} className="btn btn-danger">Difícil</button>
        <button onClick={() => iniciarJogo('infernal')} className="btn btn-dark">Infernal</button>
        <button onClick={() => setShowRankingModal(true)} className="btn btn-dark">Ranking</button>
      </div>

      <div id="raiz" className="raiz">
        {tabuleiro.map((linha, i) => (
          <div key={i} className="linha">
            {linha.map((valor, j) => (
              <input
                key={j}
                type="text"
                maxLength="1"
                value={valor}
                onChange={(e) => handleInputChange(i, j, e.target.value)}
                className={`caixa ${!celulasEditaveis[i][j] ? 'preenchido' : ''}`}
                disabled={!celulasEditaveis[i][j]}
              />
            ))}
          </div>
        ))}
      </div>

      {jogoIniciado && (
        <div className="d-flex justify-content-center">
          <span className="timer" id="timer">
            TEMPO {Math.floor(tempoRestante / 60)}:{(tempoRestante % 60).toString().padStart(2, '0')}
          </span>
        </div>
      )}

      <div className={`tela-vermelha ${telaVermelhaVisivel ? 'visivel' : ''}`} id="tela-vermelha">
        <div>VOCÊ PERDEU</div>
        <div>VOCÊ É UMA FALHA GENÉTICA</div>
        <button onClick={jogarNovamente}>Jogar Novamente</button>
      </div>

      <div className={`tela-verde ${telaVerdeVisivel ? 'visivel' : ''}`} id="tela-verde">
        <div>PARABÉNS, VOCÊ GANHOU!</div>
        <button onClick={jogarNovamente}>Jogar Novamente</button>
      </div>

      <audio ref={musicaRef} loop>
        <source src="/Conexão Zona Sul - Racionais MCs ft. ClariS.mp3" type="audio/mpeg" />
      </audio>

      {mensagem && <div className="mensagem">{mensagem}</div>}

      <button
        onClick={validarTabuleiro}
        className="btn btn-primary"
        disabled={!validarBotaoAtivo}
      >
        Validar
      </button>

      <RankingModal
        showModal={showRankingModal}
        onClose={() => setShowRankingModal(false)}
      />
    </div>
  );
};

export default Sudoku;
