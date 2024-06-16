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
import { BadgePlus, Download, FolderPlus, FilePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { format } from 'date-fns';
import {fr} from 'date-fns/locale'; 

import { get } from "http";

export const Cloud = () => {
  const [userId, setUserId] = useState<string>();
  const [folderName, setFolderName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [folderId, setFolderId] = useState("");
  const [parentFolderId, setParentFolderId] = useState<string>("yolo");
  const [retour, setRetour] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [showAddFolderForm, setShowAddFolderForm] = useState<boolean>(false); // State to manage the visibility of the folder creation form

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

  const ouvrireDossier = async (folderId: string, retour: boolean) => {
    const response = await fetch(`/api/folder/${folderId}/childs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const {files, folders} = await response.json()
    setFiles(files)
    setFolders(folders)
    setFolderId(folderId)
    console.log(parentFolderId)


  }

  const fetchFiles = async () => {
    try {
      const response_files = await fetch(`/api/file/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const response_folders = await fetch(`/api/folder/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (!response_files.ok && !response_folders.ok) {
        throw new Error(`HTTP error! Status: ${response_files.status}`);
      }
      const data_files = await response_files.json();
      const data_folders = await response_folders.json();
      
  
      if (response_files.ok && response_folders.ok) {
        setFiles(data_files.files);
        setFolders(data_folders.folders); // Assurez-vous que votre API renvoie une liste de dossiers
        setFolderId("yolo")
        setParentFolderId("yolo")
        console.log(data_files.files);
        console.log(data_folders.folders);
      } else {
        console.error("Failed to fetch files:", data_files.error);
      }
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  const goBack = async () => {
      
      if(folderId.includes("yolo") || parentFolderId.includes("yolo")){
          fetchFiles()
      } else {
          setParentFolderId(await getParent(parentFolderId))
          await ouvrireDossier(parentFolderId,retour);
      }
  }

  const getParent = async (folderId: string) => {
    const response = await fetch(`/api/folder/${folderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      }
    });

    const data = await response.json()
    var folder = data.folder
    return folder.parentFolderId
  }

  const formatDate = (dateString: string) => {
    if(dateString){
      const date = new Date(dateString);
      console.log('DAAATE',dateString)
      return format(date, 'dd MMMM yyyy', { "locale": fr }); // Pour le format "16 juin 2024"
      // return format(date, 'dd-MM-yyyy'); // Pour le format "16-06-2024"
    }
    
  };
  

  const handleBack = (folderId: string, parentFolderId: string, retour: boolean) => {
    setParentFolderId(parentFolderId)
    setFolderId(folderId)
    goBack()
}

  const handleNavigation = (folderId: string, parentFolderId: string, retour: boolean) => {
      setParentFolderId(parentFolderId)
      setFolderId(folderId)
      ouvrireDossier(folderId, retour)
  }
  

  const handleFolderSubmit = async (event: any) => {
    event.preventDefault();

    const newFolderData = {
      name: folderName,
      userId: userId,
      parentId: folderId,
    };

    try {
      const response = await fetch(`/api/folder/create?folderId=${folderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newFolderData),
      });

      if (response.ok) {
        console.log("Dossier créé avec succès");
        setFolderName("");
        setShowAddFolderForm(false); // Hide the folder creation form
        fetchFiles(); // Refresh the list of files and folders
      } else {
        console.error("Erreur lors de la création du dossier");
      }
    } catch (error) {
      console.error("Erreur lors de la requête fetch :", error);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("rttt", file);
    console.log("folderId", folderId);
    if (file) {
      await uploadFile(file, folderId);
    }
  };

  const uploadFile = async (file: File, folderId: string ) => {
    try {
      const formData = new FormData();
      formData.append('file', file); // Ajoutez le fichier à FormData
  
      // Ajoutez les autres données nécessaires
      formData.append('folderId', folderId);
      console.log("file", file);
      console.log("folderId", folderId);
      console.log("fileType", file.type);
      console.log("userId", userId);
      const response = await fetch('/api/file/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        console.log('Fichier téléversé avec succès');
        fetchFiles(); // Rafraîchit la liste des fichiers et dossiers après le téléversement
      } else {
        throw new Error('Échec du téléversement du fichier');
      }
    } catch (error) {
      console.error('Erreur lors du téléversement du fichier', error);
    }
  };
  
   // Function to delete file or folder
   const deleteItem = async (id: string, type: string) => {
    try {
      let endpoint = "";
      console.log(id);
  
      if (type === "file") {
        endpoint = `/api/file/delete/${id}`;
      } else if (type === "folder") {
        endpoint = `/api/folder/delete/${id}`;
      }
  
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.ok) {
        console.log(`${type} deleted successfully`);
        fetchFiles(); // Rafraîchir la liste des fichiers et dossiers
      } else {
        console.error(`Failed to delete ${type}`);
      }
    } catch (error) {
      console.error(`Failed to delete ${type}`, error);
    }
  };
  

  // Filtered files and folders based on search query
  const filteredFiles = files.filter(file => file.fileName.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredFolders = folders.filter(folder => folder.name.toLowerCase().includes(searchQuery.toLowerCase()));


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
          {parentFolderId && (
            <Button variant="outline" onClick={goBack} className="self-start">
              Retour
            </Button>
          )}
          <Input
            type="text"
            name="search-query"
            id="search-query"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Rechercher un fichier ou un dossier"
            className="w-full mt-5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <div className="flex gap-3 mt-3">
            <Button variant="outline" onClick={() => setShowAddFolderForm(!showAddFolderForm)}>
              <FolderPlus className="mr-2 h-4 w-4" />
              Ajouter un dossier
            </Button>
            <label htmlFor="upload-file" className="flex items-center gap-1 cursor-pointer">
              <input
                type="file"
                id="upload-file"
                name="upload-file"
                className="hidden"
                onChange={handleFileChange}
              />
              <FilePlus className="mr-2 h-4 w-4" />
              Ajouter un fichier
            </label>
          </div>
          {showAddFolderForm && (
            <form onSubmit={handleFolderSubmit} className="mt-3">
              <div className="flex items-center gap-3">
                <Input
                  type="text"
                  name="folder-name"
                  id="folder-name"
                  value={folderName}
                  onChange={(event) => setFolderName(event.target.value)}
                  placeholder="Nom du dossier"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <Button type="submit" variant="outline">
                  <BadgePlus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
            </form>
          )}
          <Table className="mt-10">
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Date d'ajout</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFolders.map((folder, index) => (
                <TableRow key={folder._id}>
                  <TableCell className="font-medium">{folder.name}</TableCell>
                  <TableCell>{formatDate(folder.creationDate)}</TableCell>
                  <TableCell className="text-right">

                    <Button variant="outline" onClick={() => handleNavigation(folder._id, folder.parentFolderId, retour)}>
                      {/* Ajoutez une icône ou un bouton si nécessaire */}
                      Dossier
                    </Button>
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={() => deleteItem(folder._id, "folder")}
                    >
                      <Trash className="mr-1 h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredFiles.map((file, index) => (
                <TableRow key={file._id}>
                  <TableCell className="font-medium">{file.fileName}</TableCell>
                  <TableCell>{formatDate(file.creationDate)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" onClick={() => downloadFile(file._id)}>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger
                    </Button>
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={() => deleteItem(file._id, "file")}
                    >
                      <Trash className="mr-1 h-4 w-4 text-red-500" />
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
  )};
  
export default Cloud;
