import { useEffect, useState } from "react";
import type { ClipboardEntry } from "../electron/clipboard.js";
import ClipboardBox from "./clipboard-box.tsx";

declare global {
  interface Window {
    copi: {
      getClipboardHistory: () => Promise<ClipboardEntry[]>;
      onNewClipboardEntry: (callback: (entry: ClipboardEntry) => void) => void;
      copyToClipboard: (text: string, options?: { ignore: boolean }) => void;
    };
  }
}

export default function App() {
  const [history, setHistory] = useState<ClipboardEntry[]>([]);
  useEffect(() => {
    // get clipboard history
    window.copi.getClipboardHistory().then(setHistory);

    // handles adding new clipboard entries
    window.copi.onNewClipboardEntry((entry) => {
      setHistory((prev) => {
        if (prev.length > 0 && prev[0].text === entry.text) {
          return prev;
        }
        return [entry, ...prev].slice(0, 50);
      });
    });
  }, []);

  // function for copying in clipboard
  const handleCopy = (text: string) => {
    window.copi.copyToClipboard(text, { ignore: true });
    console.log("Copied:", text);
  };
  return (
    <div className="bg-white p-2 font-sans">
      <h1 className="text-2xl font-bold mb-4">Copi - Clipboard History</h1>
      {history.length === 0 ? (
        <p className="text-gray-500"> Nothing Copied Yet</p>
      ) : (
        <ul>
          {history.map((entry) => (
            <li key={entry.id}>
              {" "}
              <ClipboardBox
                id={entry.id}
                text={entry.text}
                timestamp={entry.timestamp}
                onCopy={handleCopy}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
