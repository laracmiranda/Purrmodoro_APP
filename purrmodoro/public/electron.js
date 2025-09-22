const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Purrmodoro',
        width: 400,
        height: 400,
        frame: false,
        resizable: false,
        transparent: true, // 🔑 remove o fundo do sistema
        hasShadow: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true, // Mantém isolado para melhor segurança
            nodeIntegration: false,
        }
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'), // Conectando com o app em react
        protocol: 'file',
        slashes: true,
    });

    
    mainWindow.setMenuBarVisibility(false); // Remove o menu
    mainWindow.loadURL(startUrl); // Carregando o app na janela do electron

    ipcMain.on('close-app', () => {
        app.quit();
    });
}

app.whenReady().then(createMainWindow);