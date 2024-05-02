import { Button } from "./ui/button";
import { File } from "lucide-react";

interface DownloadButtonProps {
    file: File | null;
  }
  
  export const DownloadButton: React.FC<DownloadButtonProps> = ({ file }) => {
    const handleDownloadClick = () => {
      if (file) {
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        link.click();
        URL.revokeObjectURL(url);
      }
    };
  
    return (
      <Button className="w-full" onClick={handleDownloadClick} disabled={!file}>
        <File className="mr-2 h-4 w-4" /> Récupérez votre fichier
      </Button>
      
    );
  };
  