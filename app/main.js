const setupEvents = require('./events.js')

if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

var electron = require('electron')
var app = electron.app;
var ChildProcess = require('child_process');
var path = require('path');
var url = require('url');

const BrowserWindow = electron.BrowserWindow;
var mainWindow;

app.on('ready', function(){

	mainWindow = new BrowserWindow({
		width: 1020, 
		height: 720,
		backgroundColor: '#2e2c29',
		icon: 'assets/icon.png'
	});

	mainWindow.loadURL('https://evening-meadow-90633.herokuapp.com/room');

	mainWindow.on('closed', function(){
		app.quit();
	});


});