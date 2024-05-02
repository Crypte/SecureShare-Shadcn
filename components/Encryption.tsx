'use client'

import { Generatekey } from './Generatekey';
import React, { useState } from 'react';
import {FileInput} from './Fileinput';
import {DownloadButton} from './Downloadbutton';

import { Input } from "./ui/input"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { CloudUpload,WandSparkles} from "lucide-react"

export function Encryption() {

    const [userFile, setUserFile] = useState<File | null>(null);

    const handleUserFileChange = (selectedFile: File | null) => {
      setUserFile(selectedFile);
    };

    // Mot de passe
    const [encryptionType, setEncryptionType] = useState("");

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      setPasswordMatch(event.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
      setPasswordMatch(event.target.value === password);
    };

    const isPasswordFilled = password.length > 0;
    const isConfirmPasswordFilled = confirmPassword.length > 0;

    // clé privée
    

    return (
      <Card>
        <CardHeader>
          <CardTitle>Choisissez votre fichier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
         
            <FileInput onChange={handleUserFileChange} />

          <div className="space-y-2">
            <Label htmlFor="new">Choisissez votre chiffrement</Label>
            <Select onValueChange={(value) => setEncryptionType(value)}>
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
                <Label htmlFor="passwordinput">Entrez votre mot de passe</Label>
                <Input className="w-[300px]" id="passwordinput" type="password" value={password} onChange={handlePasswordChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordconfirminput">Confirmez votre mot de passe</Label>
                <Input className="w-[300px]" id="passwordconfirminput" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              </div>
              {isPasswordFilled && isConfirmPasswordFilled && passwordMatch && <p className="text-green-500">Les mots de passe correspondent</p>}
              {isPasswordFilled && isConfirmPasswordFilled && !passwordMatch && <p className="text-red-500">Les mots de passe ne correspondent pas</p>}
            </>
          )}

        {encryptionType === "privatekey" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="keyinput">Générez votre clé privée</Label>
              <Generatekey/>
            </div>
          </>
        )}

        </CardContent>
        <CardFooter className="gap-3">
        <DownloadButton file={userFile} />

          <Button className="w-full">
            <CloudUpload className="mr-2 h-4 w-4" /> Envoyez votre fichier sur le cloud
          </Button>
        </CardFooter>
      </Card>
    )
  }
