import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

export interface Toast {
  id: string;
  count?: number;
  message: string;
  closing: boolean;
}

interface ToastBoxProps {
  toast: Toast;
  index: number;
  isVisible: boolean;
  onClose: () => void;
}
export function ToastBox({ toast, index, isVisible, onClose }: ToastBoxProps) {
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // for the slide in effect of the toast
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimatingIn(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  // for the slide out effect of the toast
  useEffect(() => {
    // checks if the toast.closing variable is true, passed from the App.tsx
    if (toast.closing) {
      setIsAnimatingIn(false);

      const outTimer = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(outTimer);
    }
  }, [toast.closing, onClose]);
  return (
    <div
      className={`fixed top-4 right-4 transition-transform duration-500 drop-shadow-2xl ${isAnimatingIn ? "ease-out translate-x-0" : "ease-in translate-x-[calc(100%+1rem)]"}`}
      style={{
        top: `${16 + index * 18}px`,
        zIndex: 100 - index,
      }}
    >
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <ClipboardDocumentCheckIcon className="w-4 h-4" />
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onCloseToast: (id: string) => void;
}
export default function ToastContainer({
  toasts,
  onCloseToast,
}: ToastContainerProps) {
  return createPortal(
    <>
      {toasts.map((toast, index) => (
        <ToastBox
          key={toast.id}
          toast={toast}
          index={index}
          isVisible={true}
          onClose={() => onCloseToast(toast.id)}
        />
      ))}
    </>,
    document.body,
  );
}
