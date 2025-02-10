import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../index.css';

Modal.setAppElement('#root'); // Defina o elemento raiz da aplicação para acessibilidade

const Login = ({ onLogin, onToggleRegister }) => {
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

    const handleLogin = async () => {
        if (!username || !password) {
            openModal('Usuário e senha são necessários');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/user/login', { username, password });
            const { success, message, token } = response.data;

            if (success) {
                localStorage.setItem('token', token);
                onLogin(username);
            } else {
                openModal('Invalid username or password.');
            }
        } catch (error) {
            console.error('Error logging in: ', error);
            openModal('Usuário ou Senha Inválidos.');
        }
    };

    return (
        <div className="container">
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
            <button onClick={handleLogin}>
                Login
            </button>
            <button
                className="text-blue-500 hover:underline mt-2"
                onClick={onToggleRegister}
            >
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
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default Login;
