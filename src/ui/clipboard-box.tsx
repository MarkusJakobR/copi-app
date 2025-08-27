import CopyButton from "./components/copy-button";
interface CopyContentProps {
  id: string;
  text: string;
  timestamp: number;
  onCopy: (text: string) => void;
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
    <div className="relative bg-white shadow-neumorphic mt-2 rounded-2xl p-5 flex flex-col w-full justify-center items-center cursor-pointer active:scale-95 hover:scale-98 transition-transform group overflow-hidden">
      <div className="absolute top-3 left-3 right-3 flex flex-row justify-between items-start z-20 ">
        {/* Date on top left */}
        <div className="text-gray-600 text-xs">{readableDate}</div>

        <div className="flex gap-2 items-center">
          <CopyButton text={text} onCopy={onCopy} />
        </div>
      </div>

      {/* Text content that will blur on hover */}
      <div className="flex flex-col z-20 transition-all pt-10">
        <div className="text-black text-sm items-center">{text}</div>
      </div>

      {/* Overlay that shows on hover */}
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-300 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"></div>
    </div>
  );
}
