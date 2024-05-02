import mongoose, { Schema } from "mongoose";
import { type } from "os";
import { fileSchema } from "./fileModel";


const shareSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Nom d'utilisateur requis"],
        unique: true,
    },
    files: {
        type: [fileSchema],
        required: false,
    },
    file_ids: {
        type: [String],
        required: false,
    },
    user_id: {
       type: String,
       required: false,
    },
    time_available: {
       type: Number,
       default: 15,
       required: false,
    }
})

const Share = mongoose.models.shares || mongoose.model("shares", shareSchema);

export default Share;