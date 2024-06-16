// components/Cloud.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import jwt from "jsonwebtoken";
import { BadgePlus, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Cloud = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [folderName, setFolderName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const folderId = "yolo"; // Remplacez cette valeur par l'ID du dossier parent approprié

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwt.decode(token);
        if (decodedToken) {
          setUserId(decodedToken.userId);
          setIsConnected(true);
          fetchFiles();
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsConnected(false);
      }
    } else {
      setIsConnected(false);
    }
  }, []);

  const downloadFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/file/download/${fileId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = response.headers.get('Content-Disposition')?.split('filename=')[1] || 'file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Libérer l'URL de l'objet Blob
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch(`/api/file/all`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Envoyer le token dans l'en-tête Authorization
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (response.ok) {
        setFiles(data.files);
        console.log(data.files)
        console.log(data)
      } else {
        console.error("Failed to fetch files:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const newFolderData = {
      name: folderName,
      userId: userId,
    };

    try {
      const response = await fetch(`/api/folder/create?folderId=${folderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Envoyer le token dans l'en-tête Authorization
        },
        body: JSON.stringify(newFolderData),
      });

      if (response.ok) {
        console.log("Dossier créé avec succès");
        setFolderName(""); // Réinitialiser le champ de saisie
      } else {
        console.error("Erreur lors de la création du dossier");
      }
    } catch (error) {
      console.error("Erreur lors de la requête fetch :", error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {isConnected ? (
        <>
          <Alert variant="default" className="text-center">
            <AlertTitle>Vous êtes connecté</AlertTitle>
            <AlertDescription>
              La section drive est donc accessible
            </AlertDescription>
          </Alert>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3">
              <Input
                type="text"
                name="folder-name"
                id="folder-name"
                value={folderName}
                onChange={(event) => setFolderName(event.target.value)}
                placeholder="Cherchez un fichier ou un dossier"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <Button type="submit" variant="outline">
                <BadgePlus className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </div>
          </form>
          <Table className="mt-10">
            <TableHeader>
              <TableRow>
                <TableHead>Fichier</TableHead>
                <TableHead>Date d'ajout</TableHead>
                <TableHead className="text-right">Téléchargement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file, index) => (
                <TableRow key={file._id}>
                  <TableCell className="font-medium">{file.fileName}</TableCell>
                  <TableCell>16/06/2024</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" onClick={() => downloadFile(file._id)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <Alert variant="destructive" className="text-center">
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
