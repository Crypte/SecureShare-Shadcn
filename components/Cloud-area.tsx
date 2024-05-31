import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from './ui/button';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Download, AlertCircle } from 'lucide-react';
import jwt from 'jsonwebtoken';

export const Cloud = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [folderName, setFolderName] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const folderId = "yolo"; // Remplacez cette valeur par l'ID du dossier parent approprié

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwt.decode(token);
        if (decodedToken) {
          setUserId(decodedToken.userId);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Invalid token', error);
        setIsConnected(false);
      }
    } else {
      setIsConnected(false);
    }
  }, []);

  const data = [
    {
      file: "hello.txt",
      addedDate: "10/03/20",
    },
    {
      file: "hello.txt",
      addedDate: "10/03/20",
    },
    {
      file: "hello.txt",
      addedDate: "10/03/20",
    },
    {
      file: "hello.txt",
      addedDate: "10/03/20",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newFolderData = {
      name: folderName,
      userId: userId,
    };

    try {
      const response = await fetch(`/api/folder/create?folderId=${folderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`, // Envoyer le token dans l'en-tête Authorization
        },
        body: JSON.stringify(newFolderData),
      });

      if (response.ok) {
        console.log('Dossier créé avec succès');
        setFolderName(''); // Réinitialiser le champ de saisie
      } else {
        console.error('Erreur lors de la création du dossier');
      }
    } catch (error) {
      console.error('Erreur lors de la requête fetch :', error);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      {isConnected ? (
        <>
          <Alert variant="default" className='text-center'>
            <AlertTitle>Vous êtes connecté</AlertTitle>
            <AlertDescription>
              La section drive est donc accessible
            </AlertDescription>
          </Alert>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <label htmlFor="folder-name" className="text-sm font-medium leading-none">
                Nom du dossier
              </label>
              <input
                type="text"
                name="folder-name"
                id="folder-name"
                value={folderName}
                onChange={(event) => setFolderName(event.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <Button type="submit" variant="outline"><AlertCircle className="mr-2 h-4 w-4" />Ajouter</Button>
            </div>
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fichier</TableHead>
                <TableHead>Date d'ajout</TableHead>
                <TableHead className="text-right">Téléchargement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.file}</TableCell>
                  <TableCell>{item.addedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" />Download</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <Alert variant="destructive" className='text-center'>
          <AlertTitle>Vous n'êtes pas connecté</AlertTitle>
          <AlertDescription>
            La section drive est donc inaccessible
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Cloud;
