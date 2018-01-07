const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'build')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'khanchat-win32-ia32/'),
    authors: 'PaulaoDev',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'khanchat.exe',
    setupExe: 'khanchatInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'icon.ico')
  })
}