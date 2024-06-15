import CryptoJS from "crypto-js";
import { saveAs } from "file-saver";
import { File } from "lucide-react";
import { Button } from "./ui/button";

interface DownloadButtonProps {
  file: File | null;
  passwordMatch: boolean;
  encryptionKey: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  file,
  passwordMatch,
  encryptionKey,
}) => {
  const handleDownloadClick = async () => {
    if (file && passwordMatch && encryptionKey) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async (event) => {
        const fileContent = new Uint8Array(event.target?.result as ArrayBuffer);
        const wordArray = CryptoJS.lib.WordArray.create(fileContent);

        const key = CryptoJS.enc.Utf8.parse(encryptionKey);
        const iv = CryptoJS.lib.WordArray.random(128 / 8);

        const encrypted = CryptoJS.AES.encrypt(wordArray, key, {
          iv: iv,
          padding: CryptoJS.pad.Pkcs7,
        });

        const extension = file.name.split(".").pop();

        const encryptedContentWithIv = iv.concat(encrypted.ciphertext);
        const encryptedBase64 = CryptoJS.enc.Base64.stringify(
          encryptedContentWithIv
        );
        const encryptedWithExtension = `${encryptedBase64}.${extension}`;
        const encryptedFileBlob = new Blob([encryptedWithExtension], {
          type: "application/octet-stream",
        });

        saveAs(encryptedFileBlob, `${file.name}.encrypted`);
      };
    }
  };

  return (
    <Button
      className="w-full"
      onClick={handleDownloadClick}
      disabled={!file || !passwordMatch || !encryptionKey}
    >
      <File className="mr-2 h-4 w-4" /> Chiffrer votre fichier
    </Button>
  );
};
