import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, "Nom d'utilisateur requis"],
        unique: false,
    },
    prenom: {
        type: String,
        required: [true, "Nom d'utilisateur requis"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Email requis"],
        unique: true,
    },
    hashed_password: {
       type: String,
       required: [true, "Mot de passe requis"],
    }
})

const User = mongoose.model("users", userSchema);

export default User;