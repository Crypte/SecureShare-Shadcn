import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { connect } from "@/lib/mongo/dbConfig"; 
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import File from "@/models/fileModel";

connect()


export async function GET(request: NextRequest){

    const userId = await getDataFromToken(request);

    if(userId==null){
        return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
    }

    const files = await File.find({});
    const filesData = files.map(file => ({
        _id: file._id,
        fileName: file.fileName,
        fileType: file.fileType,
        folderId: file.folderId,
        userId: file.userId,
      }));
    if (files){
        return NextResponse.json({files: filesData})
    }


}