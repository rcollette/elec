import * as request from 'request';
import * as fs from 'fs';
import * as path from 'path';
import {config} from '../../modules/config';

window.onload = () => {
  const webview = <Electron.WebViewElement>document.getElementById('aWebView');
  const indicator = <HTMLDivElement>document.querySelector('.indicator');

  const domReady = () => {
    // Handler when the DOM is fully loaded
    if (webview) {
      try {
        //TODO register a menu item shown only in devMode that does this.
        webview.getWebContents().openDevTools();
      } catch (e) {
        alert(e.message);
      }
    }
  };

  const loadstart = () => {
    //TODO implement something more graphical for loading indicator.
    indicator.innerText = 'loading...';
  };

  const loadstop = () => {
    indicator.innerText = '';
    indicator.style.display = 'none';
    webview.style.visibility = 'visible';
    webview.openDevTools();
  };

  webview.addEventListener('did-start-loading', loadstart);
  webview.addEventListener('did-stop-loading', loadstop);
  //Not sure which opens the debugger earlier this or dom-ready
  webview.addEventListener('did-finish-loading', domReady);

  const contents = webview.getWebContents();
  contents.session.on('will-download', (event, item) => {
    event.preventDefault();
    request(item.getURL(), (data) => {
      fs.writeFileSync(path.join(__dirname, config.filePaths.virtual, item.getFilename()), data);
    });
  });
  contents.on('did-finish-load', () => contents.openDevTools());
};
