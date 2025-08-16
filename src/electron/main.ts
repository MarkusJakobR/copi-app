import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js";
import {
  clipboardWatchText,
  copyToClipboard,
  getClipboardHistory,
} from "./clipboard.js";
import { getPreloadPath } from "./pathResolver.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  clipboardWatchText((newEntry) => {
    mainWindow.webContents.send("clipboard:new-entry", newEntry);
  });
});

ipcMain.handle("clipboard:get-history", () => {
  return getClipboardHistory();
});

ipcMain.on(
  "copyToClipboard",
  (_, text: string, options?: { ignore: boolean }) => {
    copyToClipboard(text, options);
  },
);
