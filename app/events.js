var electron = require('electron')
var app = electron.app;
var ChildProcess = require('child_process');
var path = require('path');

module.exports = {
	handleSquirrelEvent: function() {

		 if (process.argv.length === 1) {
		 	return false;
		 }

		 const appFolder = path.resolve(process.execPath, '..');
		 const rootAtomFolder = path.resolve(appFolder, '..');
		 const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
		 const exeName = path.basename(process.execPath);
		 
		 const spawn = function(command, args) {

		 	let spawnedProcess, error;

		 	try {
		 		spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
		 	} catch (error) {}

			 return spawnedProcess;

		 };

		 const spawnUpdate = function(args) {
		 	return spawn(updateDotExe, args);
		 };

		 const squirrelEvent = process.argv[1];
		 switch (squirrelEvent) {
		 	case '--squirrel-install':
		 		spawnUpdate(['--createShortcut', exeName]);
		 	case '--squirrel-updated':
		 		spawnUpdate(['--createShortcut', exeName]);
		 		setTimeout(app.quit, 1000);
		 	return true;
			case '--squirrel-uninstall':
				 spawnUpdate(['--removeShortcut', exeName]);
				 setTimeout(app.quit, 1000);
				 return true;
		 	case '--squirrel-obsolete':
				 app.quit();
				 return true;
		}
	}
}