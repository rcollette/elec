import { remote } from 'electron';
import * as path from 'path';

const BrowserWindow = remote.BrowserWindow;
function windowLink(linkId: string, filePath: string, callback?: (window: Electron.BrowserWindow) => void): void {
  let link = document.getElementById(linkId);
  link.addEventListener('click', function (event: any) {
    event.preventDefault();
    // protocol seem to be required on a MAC
    const thePath = path.join('file:', __dirname, filePath);
    let win = new BrowserWindow({ width: 800, height: 800 });
    //win.webContents.openDevTools();
    win.on('close', function () {
      win = null;
    });
    win.loadURL(thePath);
    win.show();
    if (callback) {
      callback(win);
    }
  });
}

function registerListeners() {
  windowLink('viewerLink', '../viewer/web/viewer.html?file=https://www.cga.ct.gov/2017/TOB/h/pdf/2017HB-05200-R00-HB.pdf');
  windowLink('labelViewerLink', `../viewer/web/viewer.html?file=../../../assets/pdf/8x11Label.pdf`);
  windowLink('sendproLink', '../sendpro/index.html');
}

document.addEventListener('DOMContentLoaded', function (event: any) {
  registerListeners();
});
