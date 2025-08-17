interface CopyContentProps {
  id: string;
  text: string;
  timestamp: number;
  onCopy: Function;
}
export default function ClipboardBox({
  text,
  timestamp,
  onCopy,
}: CopyContentProps) {
  return (
    <div
      onClick={() => onCopy(text)}
      className="relative bg-white shadow-neumorphic mt-2 rounded-2xl p-5 flex flex-col w-full justify-center items-center cursor-pointer active:scale-95 hover:scale-102 transition-transform group overflow-hidden"
    >
      {/* Text content that will blur on hover */}
      <div className="text-black text-sm flex items-center z-10 transition-all group-hover:blur-xs group-hover:opacity-40">
        {text}
      </div>

      {/* Overlay that shows on hover */}
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Copy Text
      </div>
    </div>
  );
}
