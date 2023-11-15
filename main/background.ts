import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import fs from 'fs'
import Store from 'electron-store'
// const db = require('better-sqlite3')('../test.db', { verbose: console.log });
const sqlite3 = require('sqlite3').verbose();
let sql;
// const db = new sqlite3.Database('../norSaas.db', (err) => { if (err) return console.error(err.message); });
const db = new sqlite3.Database('sqlite.db');


const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

; (async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})


type StoreType = {
  messages: string[]
}
const store = new Store<StoreType>({ name: 'messages' })

ipcMain.on('message', async (event, arg) => {
  fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  let imageData = fs.readFileSync(arg);
  // console.
  let destinationPath = `D://Javascript/test-app/images/2.jpg`;
  // fs.writeFileSync(destinationPath, imageData);
  fs.writeFile(destinationPath, imageData, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  console.log('arg', imageData)
  event.reply('message', `kaka World!`)
})
