import React, { useEffect, useState } from "react";
import "./App.css";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [animateExit, setAnimateExit] = useState(false);

  useEffect(() => {
    // Depois de 1.5s (entrada com zoom), espera mais 0.3s antes de sair
    const timer = setTimeout(() => setAnimateExit(true), 1800); 

    // Depois de 1.8s + 0.2 (saída com zoom) -> Termina o splash
    const exitTimer = setTimeout(() => onFinish(), 2000); 

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
