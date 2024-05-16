import React, { useState } from 'react';
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
} from "@/components/ui/alert"

import { Download,AlertCircle } from 'lucide-react';

export const Cloud = ({ isConnected, _idObject }: { isConnected: boolean, _idObject: any }) => {
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
  console.log("isConnected :  "+ isConnected)

  // Ajoutez un état local pour le nom du dossier
  const [folderName, setFolderName] = useState('');

  // Ajoutez une fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Récupérer l'ID utilisateur à partir du token JWT
    const userId = _idObject;
  
    // Créer un objet de données pour le nouveau dossier
    const newFolderData = {
      name: folderName,
      userId: userId,
      __v: 0
    };
    console.log(newFolderData);
  
    // Envoyer les données du formulaire au serveur
    try {
      const response = await fetch('/api/folder/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFolderData),
      });
  
      if (response.ok) {
        // Le dossier a été créé avec succès
        console.log('Dossier créé avec succès');
        setFolderName(''); // Réinitialiser le champ de saisie
      } else {
        // La création du dossier a échoué
        console.error('Erreur lors de la création du dossier');
      }
    } catch (error) {
      // Une erreur s'est produite lors de la requête fetch
      console.error('Erreur lors de la requête fetch :', error);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
    {/* Utilisez la valeur de la props isConnected pour afficher les alertes en fonction de la connexion */}
    {isConnected ? (
        <>
          <Alert variant="default" className='text-center'>
            <AlertTitle>Vous êtes connecté</AlertTitle>
            <AlertDescription>
              La section drive est donc accessible
            </AlertDescription>
          </Alert>
          {/* Ajoutez un formulaire pour créer un nouveau dossier */}
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
        </>
      ) : (
        <Alert variant="destructive" className='text-center'>
          <AlertTitle>Vous n'est pas connecté</AlertTitle>
          <AlertDescription>
            La section drive est donc inaccessible
          </AlertDescription>
        </Alert>
      )}


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
    </div>
  );
};

export default Cloud;
