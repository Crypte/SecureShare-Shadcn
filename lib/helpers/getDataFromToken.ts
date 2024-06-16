import jwt from 'jsonwebtoken';
import { NextRequest } from "next/server"

export const getDataFromToken = (request: NextRequest) => {

    try {
        const token = (request.headers.get("Authorization") as string).replace("Bearer ", "");
        console.log(token)
        console.log('Secret:', process.env.TOKEN_SECRET);


        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log(decodedToken)

        return decodedToken.userId;

    } catch (error: any) {
        console.error('Erreur lors de la vérification du token :', error.message);
        return null;
    }
}