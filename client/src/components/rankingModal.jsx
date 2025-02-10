import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './rankingModal.css';

Modal.setAppElement('#root'); 

const RankingModal = ({ showModal, onClose }) => {
    const [rankings, setRankings] = useState([]);
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const fetchRankings = async (difficulty) => {
        try {
            const response = await axios.post('http://localhost:3000/game/ranking', { boardDifficulty: difficulty }, config);
            const rankedData = response.data.rankingData.slice(0, 10);
            setRankings(rankedData);
        } catch (error) {
            console.error('Error fetching rankings:', error);
            setRankings([]); // Clear rankings on error
        }
    };

    useEffect(() => {
        if (showModal) {
            fetchRankings('facil'); 
        }
    }, [showModal]);

    const handleClose = () => {
        setRankings([]);
        onClose();
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={handleClose}
            contentLabel="Ranking Modal"
            className="ranking-modal"
            overlayClassName="ranking-modal-overlay"
        >
            <div>
                <h2>Top 10 Rankings</h2>
                <div className="dificuldade-selector">
                    <button className="btn" onClick={() => fetchRankings('facil')}>Fácil</button>
                    <button className="btn" onClick={() => fetchRankings('medio')}>Médio</button>
                    <button className="btn" onClick={() => fetchRankings('dificil')}>Difícil</button>
                    <button className="btn" onClick={() => fetchRankings('impossivel')}>Impossível</button>
                </div>
                {rankings.length === 0 ? (
                    <p>No rankings available for this difficulty.</p>
                ) : (
                    <ul>
                        {rankings.map((ranking, index) => (
                            <li key={ranking.id}>
                                <span className="nome">{ranking.username}</span>
                                <span>{ranking.timeTaken}s</span>
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={handleClose} className="ranking-modal-close">Close</button>
            </div>
        </Modal>
    );
};

export default RankingModal;
