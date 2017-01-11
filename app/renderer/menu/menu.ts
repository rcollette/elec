import {remote} from "electron";
import * as path from "path";

const BrowserWindow = remote.BrowserWindow;


function registerListeners() {
  const viewerLink = document.getElementById("viewerLink");
  viewerLink.addEventListener("click", function (event: any) {
    event.preventDefault();
    // protocol seem to be required on a MAC
    const thePath = path.join("file:", __dirname, "../viewer/web/viewer.html");
    let win = new BrowserWindow({width: 800, height: 800});
    win.webContents.openDevTools();
    win.on("close", function () {
      win = null;
    });
    win.loadURL(thePath);
    win.show();
  });
}

document.addEventListener("DOMContentLoaded", function (event: any) {
  registerListeners();
});
