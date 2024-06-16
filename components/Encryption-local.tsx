import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CryptoJS from "crypto-js";
import { saveAs } from "file-saver";
import { File } from "lucide-react";
import React, { useState } from "react";
import { FileInput } from "./Fileinput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Encryptionlocal() {
  const [userFile, setUserFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleUserFileChange = (selectedFile: File | null) => {
    setUserFile(selectedFile);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (confirmPassword) {
      setPasswordMatch(event.target.value === confirmPassword);
    } else {
      setPasswordMatch(false);
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    if (password) {
      setPasswordMatch(event.target.value === password);
    } else {
      setPasswordMatch(false);
    }
  };

  const handleDownloadClick = async () => {
    if (userFile && passwordMatch && password) {
      try {
        const reader = new FileReader();
        reader.readAsArrayBuffer(userFile);

        reader.onload = async (event) => {
          const fileContent = new Uint8Array(
            event.target?.result as ArrayBuffer
          );
          const wordArray = CryptoJS.lib.WordArray.create(fileContent);

          const key = CryptoJS.enc.Utf8.parse(password);
          const iv = CryptoJS.lib.WordArray.random(128 / 8);

          const encrypted = CryptoJS.AES.encrypt(wordArray, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
          });

          const encryptedContentWithIv = iv.concat(encrypted.ciphertext);
          const encryptedBase64 = CryptoJS.enc.Base64.stringify(
            encryptedContentWithIv
          );

          const encryptedFileName = `${userFile.name}.encrypted`;

          const encryptedFileBlob = new Blob([encryptedBase64], {
            type: "application/octet-stream",
          });

          saveAs(encryptedFileBlob, encryptedFileName);
        };
      } catch (error) {
        console.error("Error encrypting the file:", error);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choisissez un fichier à chiffrer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <FileInput onChange={handleUserFileChange} />

        <div className="space-y-2">
          <Label htmlFor="password">Entrez votre mot de passe</Label>
          <Input
            className="w-[300px]"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmez votre mot de passe</Label>
          <Input
            className="w-[300px]"
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            disabled={!password}
          />
        </div>
        {password && confirmPassword && (
          <p className={passwordMatch ? "text-green-500" : "text-red-500"}>
            {passwordMatch
              ? "Les mots de passe correspondent"
              : "Les mots de passe ne correspondent pas"}
          </p>
        )}
      </CardContent>
      <CardFooter className="gap-3">
        <Button
          className="w-full"
          onClick={handleDownloadClick}
          disabled={!userFile || !passwordMatch || !password}
        >
          <File className="mr-2 h-4 w-4" /> Chiffrer votre fichier
        </Button>
      </CardFooter>
      {uploadMessage && <p className="text-center">{uploadMessage}</p>}
    </Card>
  );
}
