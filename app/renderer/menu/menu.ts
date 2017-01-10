import { remote } from "electron";
import * as path from "path";

const BrowserWindow = remote.BrowserWindow;


function registerListeners() {
  const viewerLink = document.getElementById("viewerLink");
  viewerLink.addEventListener("click", function (event: any) {
    event.preventDefault();
    const thePath = path.join(__dirname, "../viewer/web/viewer.html");
    let win = new BrowserWindow({ width: 800, height: 800 });
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
