import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

interface CopyButtonProps {
  onCopy: (text: string) => void;
  text: string;
}
export default function CopyButton({ onCopy, text }: CopyButtonProps) {
  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(text);
  };
  return (
    <>
      <div
        className="bg-brand-light flex items-center justify-center p-2 rounded-lg opacity-70 cursor-pointer hover:bg-brand-light/80 transition-colors"
        onClick={handleClick}
      >
        <ClipboardDocumentIcon className="text-white w-4 h-4" />
      </div>
    </>
  );
}
