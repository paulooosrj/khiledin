const electronInstaller = require('electron-winstaller');

let settings = {
    appDirectory: './build/khanchat-win32-ia32',
    outputDirectory: './build/installer',
    authors: 'PaulaoDev',
    description: 'Chat modern and fast.',
    name: 'khanchat',
    title:  'Khanchat system chat modern.',
    setupIcon: './assets/icon.ico',
    setupExe: 'khanchat.exe',
    noMsi: false,
    exe: 'khanchat.exe'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));