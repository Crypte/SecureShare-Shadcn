import mongoose from "mongoose";


const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nom d'utilisateur requis"],
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
       type: String,
    }
})

const Folder = mongoose.models.folders || mongoose.model("folders", folderSchema);

export default Folder;