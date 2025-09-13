const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Purrmodoro',
        widht: 400,
        height: 430,
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'), // Conectando com o app em react
        protocol: 'file',
        slashes: true,
    });

    mainWindow.loadUrl(startUrl); // Carregando o app na janela do electron
}

app.whenReady().then(createMainWindow);