import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileData: { type: Buffer, required: true },
  folderId: { type: String, required: true },
  userId: { type: String, required: true },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});


const File = mongoose.models.File || mongoose.model("File", FileSchema);

export default File;
