import { connect } from "@/lib/mongo/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

connect();

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Utilisez une variable d'environnement pour la clé secrète

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json(); // Suppression de 'role' des données de la requête
        const user = await User.findOne({ email });

        if (user && bcryptjs.compareSync(password, user.hashed_password)) {
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); // Génération du token sans le rôle
            return NextResponse.json({ token });
        } else {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error: any) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
