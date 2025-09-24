import React, { useEffect, useState } from "react";
import "./App.css";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [animateExit, setAnimateExit] = useState(false);

  useEffect(() => {
    // Animação de entrada depois de 1.5s
    const timer = setTimeout(() => setAnimateExit(true), 1500); 

    // Depois de 1.5s + 0.3s -> Termina o splash
    const exitTimer = setTimeout(() => onFinish(), 1800); 

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };
  }, [onFinish]);

  return (
    <div className="splash">
      <img
        src="/cat.png"
        alt="Logo"
        className={`logo ${animateExit ? "exit" : "enter"}`}
      />
    </div>
  );
}

export default SplashScreen;
