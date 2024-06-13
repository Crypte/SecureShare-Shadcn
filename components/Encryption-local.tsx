import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { DownloadButton } from "./Downloadbutton";
import { FileInput } from "./Fileinput";
import { GenerateKey } from "./Generatekey";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Encryptionlocal() {
  const [userFile, setUserFile] = useState<File | null>(null);
  const [encryptionType, setEncryptionType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleUserFileChange = (selectedFile: File | null) => {
    setUserFile(selectedFile);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choisissez un fichier à chiffrer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <FileInput onChange={handleUserFileChange} />
        <div className="space-y-2">
          <Label htmlFor="encryption-type">Choisissez votre chiffrement</Label>
          <Select onValueChange={setEncryptionType}>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Choix du chiffrement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="password">Mot de passe</SelectItem>
              <SelectItem value="privatekey">Clé privée</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {encryptionType === "password" && (
          <>
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
              <Label htmlFor="confirm-password">
                Confirmez votre mot de passe
              </Label>
              <Input
                className="w-[300px]"
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {password && confirmPassword && (
              <p className={passwordMatch ? "text-green-500" : "text-red-500"}>
                {passwordMatch
                  ? "Les mots de passe correspondent"
                  : "Les mots de passe ne correspondent pas"}
              </p>
            )}
          </>
        )}

        {encryptionType === "privatekey" && (
          <div className="space-y-2">
            <Label htmlFor="key">Générez votre clé privée</Label>
            <GenerateKey />
          </div>
        )}
      </CardContent>
      <CardFooter className="gap-3">
        <DownloadButton file={userFile} />
      </CardFooter>
      {uploadMessage && <p className="text-center">{uploadMessage}</p>}
    </Card>
  );
}
