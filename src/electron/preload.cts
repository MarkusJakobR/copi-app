import { contextBridge, ipcRenderer } from "electron";
import type { ClipboardEntry } from "./clipboard.js";

contextBridge.exposeInMainWorld("copi", {
  getClipboardHistory: (): Promise<ClipboardEntry[]> =>
    ipcRenderer.invoke("clipboard:get-history"),

  onNewClipboardEntry: (callback: (entry: ClipboardEntry) => void) => {
    ipcRenderer.on("clipboard:new-entry", (_, entry) => {
      callback(entry);
    });
  },
});
