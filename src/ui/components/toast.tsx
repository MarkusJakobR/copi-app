import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

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
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none"}`}
      style={{
        top: `${16 + index * 72}px`,
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
  return (
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
    </>
  );
}
