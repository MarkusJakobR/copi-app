import { clipboard } from "electron";
import { randomUUID } from "crypto";

export interface ClipboardEntry {
  id: string;
  text: string;
  timestamp: number;
}

let lastText = "";
let clipboardHistory: ClipboardEntry[] = [];

// watches changes in clipboard history
export function clipboardWatchText(
  onNewEntry?: (entry: ClipboardEntry) => void,
  intervalMs = 1000,
) {
  setInterval(() => {
    const currentText = clipboard.readText();
    // prevents recently copied text to be added again
    if (currentText && currentText !== lastText) {
      lastText = currentText;

      const entry: ClipboardEntry = {
        id: randomUUID(),
        text: currentText,
        timestamp: Date.now(),
      };

      if (
        clipboardHistory.length === 0 ||
        clipboardHistory[0].text !== currentText
      ) {
        clipboardHistory.unshift(entry);
        clipboardHistory = clipboardHistory.slice(0, 50); // currently at 50 maximum entries
        console.log("[Clipboard Saved]", entry);
      }

      if (onNewEntry) {
        onNewEntry(entry);
      }
    }
  }, intervalMs);
}

// updates clipboard history
export function getClipboardHistory(): ClipboardEntry[] {
  return clipboardHistory;
}

// function for copying text from the clipboard
export function copyToClipboard(text: string, options?: { ignore: boolean }) {
  if (options?.ignore) {
    lastText = text;
  }
  clipboard.writeText(text);
}
