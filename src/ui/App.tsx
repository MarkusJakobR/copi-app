import { useEffect, useState } from "react";
import type { ClipboardEntry } from "../electron/clipboard.js";

declare global {
  interface Window {
    copi: {
      getClipboardHistory: () => Promise<ClipboardEntry[]>;
      onNewClipboardEntry: (callback: (entry: ClipboardEntry) => void) => void;
    };
  }
}

export default function App() {
  const [history, setHistory] = useState<ClipboardEntry[]>([]);

  useEffect(() => {
    window.copi.getClipboardHistory().then(setHistory);

    window.copi.onNewClipboardEntry((entry) => {
      setHistory((prev) => [entry, ...prev]);
    });
  }, []);

  return (
    <div className="bg-black p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Copi - Clipboard History</h1>
      {history.length === 0 ? (
        <p className="text-gray-500"> Nothing Copied Yet</p>
      ) : (
        <ul>
          {history.map((entry) => (
            <li key={entry.id} className="p-3 border rounded shadow bg-white">
              <div className="text-sm text-gray-700 break-all">
                {entry.text}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(entry.timestamp).toLocaleTimeString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
