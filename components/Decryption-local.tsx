"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { saveAs } from "file-saver";
import { File } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

var CryptoJS = require("crypto-js");

export function Decryptionlocal() {
  const [userFile, setUserFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");

  const handleUserFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserFile(event.target.files?.[0] || null);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleDecryptClick = () => {
    if (userFile && password) {
      const reader = new FileReader();
      reader.readAsText(userFile);

      reader.onload = (event) => {
        const encryptedContentWithIv = event.target?.result as string;
        const key = CryptoJS.enc.Utf8.parse(password);

        try {
          const encryptedContentWithIvBytes = CryptoJS.enc.Base64.parse(
            encryptedContentWithIv
          );
          const iv = CryptoJS.lib.WordArray.create(
            encryptedContentWithIvBytes.words.slice(0, 128 / 32)
          );
          const encryptedContentBytes = CryptoJS.lib.WordArray.create(
            encryptedContentWithIvBytes.words.slice(128 / 32)
          );

          const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: encryptedContentBytes },
            key,
            {
              iv: iv,
              padding: CryptoJS.pad.Pkcs7,
            }
          );

          const decryptedContentBytes = CryptoJS.enc.Hex.parse(
            decrypted.toString()
          );
          const decryptedContentArray = new Uint8Array(
            decryptedContentBytes.words
          );

          const decryptedContent = CryptoJS.enc.Latin1.stringify(
            decryptedContentArray
          );

          const decryptedFileBlob = new Blob([decryptedContent], {
            type: userFile.type,
          });

          const decryptedFileName = userFile.name.replace(/.encrypted$/, "");

          saveAs(decryptedFileBlob, decryptedFileName);
        } catch (error) {
          console.error("Error decrypting file:", error);
        }
      };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choisissez un fichier à déchiffrer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fileinput">Choisissez votre fichier</Label>
          <Input
            className="w-[300px]"
            id="fileinput"
            type="file"
            onChange={handleUserFileChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyinput">
            Veuillez entrer la clé ou le mot de passe
          </Label>
          <Input
            className="w-[300px]"
            id="keyinput"
            type="text"
            onChange={handlePasswordChange}
          />
        </div>
      </CardContent>
      <CardFooter className="gap-3">
        <Button className="w-full" onClick={handleDecryptClick}>
          <File className="mr-2 h-4 w-4" /> Récupérez votre fichier
        </Button>
      </CardFooter>
    </Card>
  );
}
