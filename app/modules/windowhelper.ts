import {BrowserWindow} from 'electron';
import * as path from 'path';

class WindowHelper {
  static openWindowFile(filePath: string, options: Electron.BrowserWindowOptions = {
    width: 800,
    height: 800
  }) {
    const thePath = path.join('file:', __dirname, filePath);
    let win = new BrowserWindow(options);
    win.on('close', function () {
      win = null;
    });
    win.loadURL(thePath);
    win.show();
    return win;
  }
}

export {WindowHelper}
