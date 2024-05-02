
import { ObjectId } from "mongodb";
import mongoose from "mongoose";


export const fileSchema = new mongoose.Schema({
    fileName: String,
    fileType: String,
    fileData: Buffer, // Contenu du fichier sous forme de données binaires

    folderId: ObjectId,
    userId: ObjectId
  });

const File = mongoose.model('File', fileSchema);

export default File;