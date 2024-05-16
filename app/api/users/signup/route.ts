import { connect } from "@/lib/mongo/dbConfig"; 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest){
    try {
        const formData = await request.formData();
        const nom = formData.get('nom');
        const prenom = formData.get('prenom');
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
 
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            nom,
            prenom,
            email,
            hashed_password: hashedPassword
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });
    } catch (error) {
        console.error("Server error:", error); // Log the error for debugging purposes
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
