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
  //  const handleCopy = () => {
  //    navigator.clipboard.writeText(text).then(() => {
  //      console.log("Copied to clipboard:", text);
  //      // TODO: show feedback when text is copied
  //    });
  //  };
  return (
    <div
      onClick={() => onCopy(text)}
      className="bg-white shadow-neumorphic mt-2 rounded-2xl p-5 flex flex-col w-full justify-center items-center cursor-pointer active:scale-95 hover:scale-102 transition-transform"
    >
      <div className="text-black text-sm flex items-center">{text}</div>
    </div>
  );
}
