import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { connect } from "@/lib/mongo/dbConfig"; 
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import File from "@/models/fileModel";

connect()


export async function GET(request: NextRequest, { params }: { params: { folderId: string }}){
    const search = request.nextUrl.searchParams.get('name');
    
    const userId = await getDataFromToken(request);

    if(userId==null){
        return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
    }
    if(search){
        var filesRetrieved = await File.find({"fileName": {"$regex": search, "$options": "i"}, "userId": userId, "folderId": params.folderId}).select({"fileName":1, "fileType": 1, "fileData":0});
    } else {
        var filesRetrieved = await File.find({"userId": userId, "folderId": params.folderId}).select({"fileName":1, "fileType": 1, "fileData": 0});
    }

    if (filesRetrieved){
        return NextResponse.json(filesRetrieved).headers.set('Content-Type', 'application/json');
    }


}