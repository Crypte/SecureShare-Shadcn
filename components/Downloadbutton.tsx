import { File } from "lucide-react";
import { Button } from "./ui/button";
interface DownloadButtonProps {
  file: File | null;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ file }) => {
  var CryptoJS = require("crypto-js");
  const handleDownloadClick = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Button className="w-full" onClick={handleDownloadClick} disabled={!file}>
      <File className="mr-2 h-4 w-4" /> Chiffrer votre fichier
    </Button>
  );
};
