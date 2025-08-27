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
  const dateObject: Date = new Date(timestamp);
  const readableDate: string = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(dateObject);
  return (
    <div
      onClick={() => onCopy(text)}
      className="relative bg-white shadow-neumorphic mt-2 rounded-2xl p-5 flex flex-col w-full justify-center items-center cursor-pointer active:scale-95 hover:scale-98 transition-transform group overflow-hidden"
    >
      {/* Date on top left */}
      <div className="absolute top-3 left-3 z-20 transition-all  text-gray-600 text-xs align-top pb-3">
        {readableDate}
      </div>

      {/* Text content that will blur on hover */}
      <div className="flex flex-col z-10 transition-all pt-6">
        <div className="text-black text-sm items-center">{text}</div>
      </div>

      {/* Overlay that shows on hover */}
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-300 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"></div>
    </div>
  );
}
