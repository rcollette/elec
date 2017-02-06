import {app, BrowserWindow, session} from 'electron';
import {Volume} from 'memfs';
import * as path from 'path';
import * as url from 'url';
import * as unionfs from 'unionfs';
import * as fs from 'fs';
import {config} from './modules/config';
import * as printer from 'printer/printer';

// keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow;

// create a virtual filesystem where temporary downloads will go to.
const volume = new Volume;
volume.mount(path.join(__dirname, config.filePaths.virtual));
unionfs.use(fs).use(volume);

unionfs.replace(fs);

function createWindow() {
  console.log('creating main window');
  // create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      partition: 'persist:mySession'
    }
  });
  mainWindow.setTitle(config.appName);

// and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'renderer/menu/menu.html'),
    protocol: 'file:',
    slashes: true
  }));

// open the DevTools.
//mainWindow.webContents.openDevTools();

// emitted when the window is closed.
  mainWindow.on('closed', function () {
    // dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

app.on('ready', () => {
  const mySession = session.fromPartition('persist:mySession');
  console.log(mySession.getUserAgent());
  console.log(mySession === session.defaultSession);
});

// this method will be called when Electron has finished
// initialization and is ready to create browser windows.
// some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// quit when all windows are closed.
app.on('window-all-closed', function () {
  session.defaultSession.flushStorageData();
  // on OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // TODO - Determine how to process exit when running in an ide terminal/run task
  //if (process.platform !== 'darwin') {
  app.quit();
  process.exit();
  //}
});

app.on('activate', function () {
  // 0n OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
    //console.log(printer.getDefaultPrinterName());
  }
});

// in this filec you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

