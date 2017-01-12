import { remote } from "electron";
import * as path from "path";

const BrowserWindow = remote.BrowserWindow;

function windowLink(linkId: string, filePath: string) {
  const link = document.getElementById("viewerLink");
  link.addEventListener("click", function (event: any) {
    event.preventDefault();
    // protocol seem to be required on a MAC
    const thePath = path.join("file:", __dirname, filePath);
    let win = new BrowserWindow({ width: 800, height: 800 });
    win.webContents.openDevTools();
    win.on("close", function () {
      win = null;
    });
    win.loadURL(thePath);
    win.show();
  });
}

function registerListeners() {
  windowLink("viewerLink", "../viewer/web/viewer.html");
  windowLink("sendproLink", "../sendpro/index.html");
}

document.addEventListener("DOMContentLoaded", function (event: any) {
  registerListeners();
});
