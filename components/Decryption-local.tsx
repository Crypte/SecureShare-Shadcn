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
  const [decryptionMessage, setDecryptionMessage] = useState("");

  const handleUserFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserFile(event.target.files?.[0] || null);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleDecryptClick = () => {
    if (userFile && password) {
      try {
        const reader = new FileReader();
        reader.readAsArrayBuffer(userFile);

        reader.onload = (event) => {
          const fileContent = event.target?.result as ArrayBuffer;

          // Extract IV and encrypted bytes
          const encryptedContent = new Uint8Array(fileContent);
          const iv = CryptoJS.lib.WordArray.create(
            encryptedContent.slice(0, 16)
          );
          const encryptedBytes = encryptedContent.slice(16);

          // Decrypt
          const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: CryptoJS.lib.WordArray.create(encryptedBytes) },
            CryptoJS.enc.Utf8.parse(password),
            { iv: iv, padding: CryptoJS.pad.Pkcs7 }
          );

          // Convert decrypted data to blob
          const decryptedFileBlob = new Blob(
            [decrypted.toString(CryptoJS.enc.Latin1)],
            {
              type: userFile.type,
            }
          );

          // Save decrypted file
          const decryptedFileName = userFile.name.replace(/\.encrypted$/, "");
          saveAs(decryptedFileBlob, decryptedFileName);

          // Success message or further actions
          setDecryptionMessage("Fichier déchiffré avec succès !");
        };
      } catch (error) {
        console.error("Erreur lors du déchiffrement du fichier:", error);
        setDecryptionMessage("Erreur lors du déchiffrement du fichier.");
      }
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
