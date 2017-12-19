const electron = require('electron');
const app = electron.app;
var path = require('path');
var cp = require('child_process');

var handleSquirrelEvent = function() {

   if (process.platform != 'win32') {
      return false;
   }

   function executeSquirrelCommand(args, done) {
      var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
      var child = cp.spawn(updateDotExe, args, { detached: true });
      child.on('close', function(code) {
         done();
      });
   };

   function install(done) {
      var target = path.basename(process.execPath);
      executeSquirrelCommand(["--createShortcut", target], done);
   };

   function uninstall(done) {
      var target = path.basename(process.execPath);
      executeSquirrelCommand(["--removeShortcut", target], done);
   };

   var squirrelEvent = process.argv[1];

   switch (squirrelEvent) {
      case '--squirrel-install':
         install(app.quit);
         return true;
      case '--squirrel-updated':
         install(app.quit);
         return true;
      case '--squirrel-obsolete':
         app.quit();
         return true;
      case '--squirrel-uninstall':
         uninstall(app.quit);
         return true;
   }

   return false;
   
};

if (handleSquirrelEvent()) return ;

const path = require('path');
const url = require('url');

const BrowserWindow = electron.BrowserWindow;
var mainWindow;

app.on('ready', function(){

	mainWindow = new BrowserWindow({
		width: 1200, 
		height: 720,
		backgroundColor: '#2e2c29',
		icon: 'assets/icon.png'
	});

	mainWindow.loadURL('https://evening-meadow-90633.herokuapp.com/room');

	mainWindow.on('closed', function(){
		app.quit();
	});


});