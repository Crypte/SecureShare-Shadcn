import { connect } from "@/lib/mongo/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        // Récupérer tous les utilisateurs de la base de données
        const users = await User.find();
        // Retourner les utilisateurs sous forme de réponse JSON
        return NextResponse.json(users);
    } catch (error: any) {
        // En cas d'erreur, renvoyer une réponse d'erreur avec un code d'état 500
        console.error("Error fetching users why:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}