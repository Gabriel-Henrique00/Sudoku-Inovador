import React, { useState } from 'react';
import axios from 'axios';
    import Modal from 'react-modal';
import '../index.css';

Modal.setAppElement('#root'); 
const Register = ({ onRegisterSuccess, onToggleRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const openModal = (message) => {
        setModalMessage(message);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalMessage('');
    };

    const handleRegister = async () => {
        if (!username || !password) {
            openModal('Usuário e senha são necessários');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/user/register', { username, password });
            const { success, message } = response.data;

            if (success) {
                onRegisterSuccess();
            } else if (message === 'O nome') {
                openModal('Usuário já existe. Por favor, escolha um nome de usuário diferente');
            } else {
                openModal(message);
            }
        } catch (error) {
            console.error('Error registering:', error);
            openModal('Error registering. Please try again.');
        }
    };

    return (
        <div className="container">
            <button className="back-button" onClick={onToggleRegister}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
            />
            <button onClick={handleRegister}>
                Register
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Error Message"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>CALMA LÁ AMIGÃO</h2>
                <div>{modalMessage}</div>
                <button onClick={closeModal}>Fechar</button>
            </Modal>
        </div>
    );
};

export default Register;
