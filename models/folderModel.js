import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nom du dossier requis"],
  },
  userId: {
    type: String,
    required: true,
  },
  parentFolderId: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const Folder = mongoose.models.Folder || mongoose.model("Folder", folderSchema);

export default Folder;
