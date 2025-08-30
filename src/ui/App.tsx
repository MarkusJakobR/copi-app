import { useEffect, useState } from "react";
import type { ClipboardEntry } from "../electron/clipboard.js";
import ToastContainer, { type Toast } from "./components/toast.tsx";
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
  // const [showToast, setShowToast] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [copyCount, setCopyCount] = useState(0);
  const MAX_TOASTS = 5;
  const TOAST_DURATION = 2000;

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

    const newCount = copyCount + 1;
    setCopyCount(newCount);

    const newToast = {
      id: Date.now().toString(),
      message: "Copied to clipboard!",
    };

    setToasts((prevToasts) => {
      const updatedToasts = [...prevToasts, newToast];

      if (updatedToasts.length > MAX_TOASTS) {
        return updatedToasts.slice(-MAX_TOASTS);
      }

      return updatedToasts;
    });

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newToast.id),
      );
    }, TOAST_DURATION);
    console.log("Copied:", text);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };
  return (
    <div className="bg-white p-2 font-sans">
      <h1 className="text-2xl font-bold mb-4">Copi - Clipboard History</h1>
      <ToastContainer toasts={toasts} onCloseToast={removeToast} />
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
