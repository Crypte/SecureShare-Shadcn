import { connect } from "@/lib/mongo/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/lib/helpers/getDataFromToken";

connect();


export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        if(userId==null){
            return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
        }
        const user = await User.findById(userId).select("-hashed_password");
        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Error fetching users why:", error);
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
}