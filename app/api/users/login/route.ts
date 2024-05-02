import { connect } from "@/lib/mongo/dbConfig"; 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()
// Calls the connect function to establish a connection to the database.

export async function POST(request: NextRequest){
    try {
        const formData = await request.formData()
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        
        const validPassword = await bcryptjs.compare(password, user.hashed_password);
        if(!validPassword){
            return NextResponse.json({error: "Invlid password"}, {status: 400})
        }

//Création du JWT

        const tokenData = {
            id: user._id,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // Create a JSON response indicating successful login
        const response = NextResponse.json({
            access_token: token
        });

        // Set the token as an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}