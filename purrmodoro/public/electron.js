const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
let splashWindow;

function createMainWindow() {

    // Splash window
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        alwaysOnTop: true, 
        transparent: true,
        resizable: false,
    });

    splashWindow.loadFile(path.join(__dirname, 'splash.html'));

    // Main window
    const mainWindow = new BrowserWindow({
        title: 'Purrmodoro',
        width: 400,
        height: 400,
        frame: false,
        resizable: false,
        transparent: true, // 🔑 remove o fundo do sistema
        hasShadow: true,
        icon: path.join(__dirname, 'cat.ico'),
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true, // Mantém isolado para melhor segurança
            nodeIntegration: false,
        }
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'), // React build
        protocol: 'file',
        slashes: true,
    });

    
    mainWindow.setMenuBarVisibility(false); // Remove o menu
    mainWindow.loadURL(startUrl); // Carregando o app na janela do electron

    // Quando o app estiver pronto
    mainWindow.once('ready-to-show', () => {
        // Dando tempo para animação rodar (1s)
        setTimeout(() => {
            if (splashWindow) {
                splashWindow.close();
            }
            mainWindow.show();
        }, 2100);
    });

    ipcMain.on('close-app', () => {
        app.quit();
    });
}

app.whenReady().then(createMainWindow);