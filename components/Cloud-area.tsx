import React from 'react';
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

export const Cloud = () => {
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

  return (
    <div className='flex flex-col gap-3'>
      <Alert variant="destructive" className='text-center'>
      <AlertTitle>Vous n'est pas connecté</AlertTitle>
      <AlertDescription>
        La section drive est donc inaccessible
      </AlertDescription>
    </Alert>

    <Alert variant="default" className='text-center'>
      <AlertTitle>Vous êtes connecté</AlertTitle>
      <AlertDescription>
        La section drive est donc accessible
      </AlertDescription>
    </Alert>


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
