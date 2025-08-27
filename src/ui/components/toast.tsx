import React, { useState } from "react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}
export default function ToastBox({ message, isVisible, onClose }: ToastProps) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
    >
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <ClipboardDocumentCheckIcon className="w-4 h-4" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
