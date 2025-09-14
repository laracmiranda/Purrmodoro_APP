import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, SetIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [coolMessage, setCoolMessage] = useState("");

  const cheerMessages = [
    "Você consegue!",
    "Eu acredito em você!",
    "Você é incrível!",
    "Continue, vai dar certo!",
    "Continue focado, você consegue!"
  ];

  const breakMessages = [
    "Se hidrate!",
    "Lanchinho, talvez?",
    "Te amo <3",
    "Se estique um pouco!"
  ];

  // Mensagens legais!
  useEffect( () => {
    let messageInterval: NodeJS.Timeout;
    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setCoolMessage(messages[0]); // Começa com a primeira mensagem
      let index = 1
      
      messageInterval = setInterval( () => {
        setCoolMessage(messages[index]);
        index = (index + 1 ) % messages.length;
      }, 4000); // A cada 4 segundos
    } else {
      setCoolMessage("");
    }

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  // Contagem de tempo
  useEffect( () => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval( () => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return() => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');

    return `${m}:${s}`;
  };

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    SetIsRunning(false);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
  }

  const handleClick = () => {
    if (!isRunning) {
      SetIsRunning(true);
    } else {
      SetIsRunning(false);
      setTimeLeft(isBreak? 5 * 60 : 25 * 60);
    }
  }

  return (
    <div style={{position: 'relative'}}>
    <div>
      <button className='closeButton'>
        Close
      </button>
    </div>

    <div className='home-content'>
      <div className='home-controls'>
        <button className='image-button' onClick={ () => switchMode(false)}>
          Estude!
        </button>
        <button className='image-button' onClick={ () => switchMode(true)}>
          Pausinha
        </button>
      </div>
    </div>

    <p className={`cool-message ${!isRunning ? "hidden" : ""}`}>
      { coolMessage }
    </p>

    <h1 className='home-timer'>{formatTime(timeLeft)}</h1>

    <button className='home-button' onClick={handleClick}>
      Começar
    </button>

    </div>
  );

}

export default App;
