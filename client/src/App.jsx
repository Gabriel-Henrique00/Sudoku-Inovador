import React, { useState } from 'react';
import Sudoku from './components/sudoku';
import Login from './components/login';
import Register from './components/register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleRegisterSuccess = () => {
    setShowRegisterSuccess(true);
    setTimeout(() => {
      setShowRegisterSuccess(false);
      setShowRegister(false);
    }, 1500); 
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="App">
      {!isLoggedIn && !showRegister && !showRegisterSuccess && <Login onLogin={handleLoginSuccess} onToggleRegister={toggleRegister} />}
      {!isLoggedIn && showRegister && <Register onRegisterSuccess={handleRegisterSuccess} onToggleRegister={toggleRegister} />}
      {!isLoggedIn && showRegisterSuccess && <div className="flex flex-col items-center justify-center min-h-screen">VOCÊ FOI REGISTRADO, FAÇA O LOGIN AGORA</div>}
      {isLoggedIn && <Sudoku username={username} />}
    </div>
  );
};

export default App;
