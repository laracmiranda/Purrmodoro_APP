import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

import playImg from "./assets/play.png";
import resetImg from "./assets/reset.png";
import workBtn from "./assets/work.png";
import workBtnClicked from "./assets/work-clicked.png";
import breakBtn from "./assets/break.png";
import breakBtnClicked from "./assets/break-clicked.png"
import idleGif from "./assets/idle.gif";
import workGif from "./assets/work.gif";
import breakGif from "./assets/break.gif";
import meowSound from "./assets/meow.mp3";
import closeBtn from "./assets/close.png";
import SplashScreen from './SplashScreen';

function App() {
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [breakBtnImage, setBreakBtnImage] = useState(breakBtn);
  const [workBtnImage, setWorkBtnImage] = useState(workBtn);
  const [coolMessage, setCoolMessage] = useState("");
  const [gifImage, setGifImage] = useState(idleGif);
  const [btnIcon, setBtnIcon] = useState(playImg);
  const [loading, setLoading] = useState(true);
  const meowAudio = useMemo(() => new Audio(meowSound), []);

  const messages = {
    work: [
    "Você consegue!",
    "Eu acredito em você!",
    "Você é incrível!",
    "Continue, vai dar certo!",
    "Continue focado!"
    ],
    break: [
    "Se hidrate!",
    "Lanchinho, talvez?",
    "Te amo <3",
    "Se estique um pouco!"
    ]
  };

  // Fechando o app pelo botão de close (x)
  const handleCloseApp = () => {
    if (window.electronAPI?.closeApp) {
      window.electronAPI.closeApp();
    } else {
      console.warn("API do Electron não está disponível");
    }
  }

  // Atualizando as mensagens!
  useEffect( () => {
    let messageInterval: NodeJS.Timeout;
    if (isRunning) {
      const currentMessages = isBreak ? messages.break : messages.work;
      setCoolMessage(currentMessages[0]); // Inicia com a primeira mensagem
      let index = 1
      
      messageInterval = setInterval( () => {
        setCoolMessage(currentMessages[index]);
        index = (index + 1 ) % currentMessages.length;
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
    setIsRunning(false);
    setBreakBtnImage(breakMode ? breakBtnClicked : breakBtn);
    setWorkBtnImage(breakMode ? workBtn : workBtnClicked);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
    setGifImage(idleGif);
  }

  // Reseta o tempo pro começo
  const resetTimer = () => {
    setIsRunning(false);
    setBtnIcon(playImg);
    setGifImage(idleGif);
    setTimeLeft(isBreak? 5 * 60 : 25 * 60);
  };

  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
      setGifImage (isBreak ? breakGif : workGif);
      setBtnIcon(resetImg);
    } else {
      resetTimer();
    }
  }

  // Somzinho de miau
  useEffect( () => {
    if (timeLeft == 0 && isRunning) {
      meowAudio.play().catch(err => {
        console.error("Áudio falhou:", err);
      });
      resetTimer();
    }
  }, [timeLeft]);

  return (
    <>
    { loading ? (
      <SplashScreen onFinish={() => setLoading(false)} />
    ) : (
      <div className='home-container' style={{position: 'relative'}}>
        <div>
          <button className='close-button' onClick={handleCloseApp}>
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

        <p className={`cool-message ${!isRunning ? "hidden" : ""}`}>
          { coolMessage }
        </p>

        <h1 className='home-timer'>{formatTime(timeLeft)}</h1>
        <img src={gifImage} alt="Time" className='gif-image' />
        <button className='home-button' onClick={handleClick}>
          <img src={btnIcon} alt="Button icon" />
        </button>
        </div>
      </div>
    )}
    </>
  );
}

export default App;
