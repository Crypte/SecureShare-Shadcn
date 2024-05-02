import { Label } from './ui/label';
import { Input } from './ui/input';

import React, { ChangeEvent, useState } from 'react';

interface FileInputProps {
  onChange: (file: File | null) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    onChange(selectedFile);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="fileinput">Choisissez votre fichier</Label>
      <Input className="w-[300px]" id="fileinput" type="file" onChange={handleFileChange} />
    </div>
  );
};

