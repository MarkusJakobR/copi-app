import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";

export interface Toast {
  id: string;
  count?: number;
  message: string;
}

interface ToastBoxProps {
  toast: Toast;
  index: number;
  isVisible: boolean;
  onClose: () => void;
}
export function ToastBox({ toast, index, isVisible, onClose }: ToastBoxProps) {
  return (
    <div
      className={`fixed top-4 right-4 transition-all duration-300 drop-shadow-2xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none"}`}
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
