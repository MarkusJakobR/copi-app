import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import ToastBox from "./toast";
import React, { useState } from "react";

interface CopyButtonProps {
  onCopy: (text: string) => void;
  text: string;
}
export default function CopyButton({ onCopy, text }: CopyButtonProps) {
  const [showToast, setShowToast] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(text);
      onCopy(text);

      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <>
      <div
        className="bg-brand-light flex items-center justify-center p-2 rounded-lg opacity-70 cursor-pointer hover:bg-brand-light/80 transition-colors"
        onClick={handleClick}
      >
        <ClipboardDocumentIcon className="text-white w-4 h-4" />
      </div>
      <ToastBox
        message="Copied to clipboard!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
