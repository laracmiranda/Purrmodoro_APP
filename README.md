# <img width="50" height="50" alt="appicon" src="https://github.com/user-attachments/assets/7fce1d54-1f47-4853-a904-411bd14ee58a" /> Purrmodoro

<p align="left"> 
  
![Node.js](https://img.shields.io/badge/Node.js-22+-pink.svg)
![React](https://img.shields.io/badge/React-19.1.1-pink.svg)
![Typescript](https://img.shields.io/badge/Typescript-4.9.5-pink.svg)
![Electron](https://img.shields.io/badge/Electron-36.2.1-pink.svg)

Aplicativo de método pomodoro desenvolvido com React, Typescrypt, Node + Electron. Permite definir entre o modo de estudo e pausa, com um design amigável pixel art criado por mim!

👉 Instale a versão para Windows: [Purrmodoro para Windows](https://github.com/laracmiranda/Purrmodoro_APP/releases/tag/v0.1.0)

## 📸 Demonstração rápida


---

## 🕒 Funcionalidades

- Splash screen ao início do app
- Timer Pomodoro (ciclos de trabalho e descanso)
- Versão rodando no navegador (web)
- Versão desktop via `Electron`
- Gráficos / pixel art personalizados feitos por mim!   
- Interface amigável, simples, focada no fluxo de trabalho
- Contador de tempo com sinalizador de som ao final

--- 

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Electron** - Builder de apps desktop
- **React** - Frontend da aplicação
- **Piskel** - Design das artes em 2D

---

## 📦 Instalação

1. Clone o repositório  
```bash
git clone https://github.com/laracmiranda/Purrmodoro_APP.git
cd Purrmodoro_APP
```

2. Instale dependências
```bash
npm install
```

3. Para rodar localmente em modo web
```bash
npm run start
```

4. Para rodar versão desktop (Electron)
```bash
npm run electron
```

5. Build para produção
```bash
npm run build
```

6. Para criar o app desktop (Electron)
```bash
npx electron-builder
```

---

## ✨ Utilizando 

* Na versão **web**, acesse pelo navegador após rodar o comando de desenvolvimento
* Na versão **desktop**, vai abrir uma janela própria via Electron já com o comportamento de app local
* Use os ciclos de trabalho e descanso para organizar suas tarefas.

---

## 📂 Estrutura do Projeto

Uma visão geral das pastas e arquivos principais:

```
purrmodoro/
├── src/
│   ├── assets/          # Arte em pixel, ícones, imagens
│   ├── App.tsx          # Toda funcionalidade do código
│   └── App.css          # Estilização do app
├── public/              
│   ├── electron.js      # Código específico do Electron
│   ├── splash.js        # Splash screen que roda ao iniciar o app
├── package.json
├── tsconfig.json
└── ... outros arquivos de configuração
```

---

## 🤝 Contribuição
1. Faça um fork deste repositório  
2. Crie uma branch com sua feature (`git checkout -b feature/nome-da-feature`)  
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)  
4. Push para a branch (`git push origin feature/nome-da-feature`)  
5. Abra um Pull Request explicando o que altera e por quê

---

## 📃 Licença

Este projeto está licenciado sob a licença **MIT** 

---

> *“Trabalhe forte quando estiver focado; descanse bem quando estiver pausado.”*
