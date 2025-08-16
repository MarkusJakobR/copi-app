import { clipboard } from "electron";
import { randomUUID } from "crypto";

export interface ClipboardEntry {
  id: string;
  text: string;
  timestamp: number;
}

let lastText = "";
let clipboardHistory: ClipboardEntry[] = [];

/**
export function clipboardGetText(): string {
  const text = clipboard.readText();
  console.log("[Clipboard]", text);
  return text;
}
**/

export function clipboardWatchText(
  onNewEntry?: (entry: ClipboardEntry) => void,
  intervalMs = 1000,
) {
  setInterval(() => {
    const currentText = clipboard.readText();
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
        clipboardHistory = clipboardHistory.slice(0, 50);
        console.log("[Clipboard Saved]", entry);
      }

      if (onNewEntry) {
        onNewEntry(entry);
      }
    }
  }, intervalMs);
}

export function getClipboardHistory(): ClipboardEntry[] {
  return clipboardHistory;
}

export function copyToClipboard(
  text: string,
  options?: { ignore: boolean },
) {
  if (options?.ignore) {
    lastText = text;
  }
  clipboard.writeText(text);
}
