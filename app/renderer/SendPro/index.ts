"use strict";
import {remote} from "electron";

debugger;
//Need to do this (or similar) because the debugger window ia associated with the main window and not the webview.
let webView = <Electron.WebViewElement>document.querySelector("webview");
let contents = webView.getWebContents();
contents.on("did-finish-load", () => contents.openDevTools());
