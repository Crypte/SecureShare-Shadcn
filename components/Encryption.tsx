import React, { useState } from 'react';
import { GenerateKey } from './Generatekey';
import { FileInput } from './Fileinput';
import { DownloadButton } from './Downloadbutton';
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudUpload } from "lucide-react";

interface EncryptionProps {
  _idObject: string | null;
}

export function Encryption({ _idObject }: EncryptionProps) {
  const [userFile, setUserFile] = useState<File | null>(null);
  const [encryptionType, setEncryptionType] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleUserFileChange = (selectedFile: File | null) => {
    setUserFile(selectedFile);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  const handleUploadToCloud = async () => {
    if (!userFile) {
      setUploadMessage('Veuillez sélectionner un fichier à téléverser.');
      return;
    }

    const formData = new FormData();
    formData.append('file', userFile);
    formData.append('fileName', userFile.name);
    formData.append('fileType', userFile.type);
    formData.append('folderId', _idObject || '');
    formData.append('userId', 'your_user_id_here');

    try {
      const response = await fetch('/api/file/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Échec de la requête de téléversement.');
      }

      const data = await response.json();
      setUploadMessage(`Le fichier ${userFile.name} a été téléversé avec succès.`);
    } catch (error) {
      setUploadMessage(`Échec du téléversement du fichier : ${error.message}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choisissez votre fichier</CardTitle>
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
              <Input className="w-[300px]" id="password" type="password" value={password} onChange={handlePasswordChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmez votre mot de passe</Label>
              <Input className="w-[300px]" id="confirm-password" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </div>
            {password && confirmPassword && (
              <p className={passwordMatch ? "text-green-500" : "text-red-500"}>
                {passwordMatch ? "Les mots de passe correspondent" : "Les mots de passe ne correspondent pas"}
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
        <Button className="w-full" onClick={handleUploadToCloud} disabled={!_idObject}>
          <CloudUpload className="mr-2 h-4 w-4" /> Envoyez votre fichier sur le cloud
        </Button>
      </CardFooter>
      {uploadMessage && <p className="text-center">{uploadMessage}</p>}
    </Card>
  );
}
