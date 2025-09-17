import React, { useState, useEffect } from 'react';
import './App.css';

import playImg from "./assets/play.png";
import resetImg from "./assets/reset.png";
import workBtn from "./assets/work.png";
import workBtnClicked from "./assets/work-clicked.png";
import breakBtn from "./assets/break.png";
import breakBtnClicked from "./assets/break-clicked.png"
import idleGif from "./assets/idle.gif";
import workGif from "./assets/work.gif";
import meowSound from "./assets/meow.mp3";
import closeBtn from "./assets/close.png";

function App() {
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, SetIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [breakBtnImage, setBreakBtnImage] = useState(breakBtn);
  const [workBtnImage, setWorkBtnImage] = useState(workBtn);
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

  // Atualizando as mensagens!
  useEffect( () => {
    let messageInterval: NodeJS.Timeout;
    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setCoolMessage(messages[0]); // Inicia com a primeira mensagem
      let index = 1
      
      messageInterval = setInterval( () => {
        setCoolMessage(messages[index]);
        index = (index + 1 ) % messages.length;
      }, 5000); // Atualiza a cada 5 segundos
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

  // Iniciar com botão de estudo clicado
  useEffect( () => {
    switchMode(false);
  }, []);

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    SetIsRunning(false);
    setBreakBtnImage(breakMode ? breakBtnClicked : breakBtn);
    setWorkBtnImage(breakMode ? workBtn : workBtnClicked);
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

  const containerClass = `home-container ${isRunning ? "background-green" : ""}`;

  return (
    <div className={containerClass} style={{position: 'relative'}}>
      <div>
        <button className='close-button'>
          <img src={closeBtn} alt="Close" />
        </button>
      </div>

      <div className='home-content'>
        <div className='home-controls'>
          <button className='image-button' onClick={ () => switchMode(false)}>
            <img src={workBtnImage} alt="Work" />
          </button>
          <button className='image-button' onClick={ () => switchMode(true)}>
            <img src={breakBtnImage} alt="Pausinha" />
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
