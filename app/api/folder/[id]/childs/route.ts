import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { connect } from "@/lib/mongo/dbConfig"; 
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import File from "@/models/fileModel";
import Folder from "@/models/folderModel";

connect()


export async function GET(request: NextRequest, { params }: { params: { id: string }}){

    const userId = await getDataFromToken(request);

    if(userId==null){
        return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
    }

    const folders = await Folder.find({"userId": userId, "parentFolderId": params.id});
    const files = await File.find({"userId": userId, "folderId": params.id}).select({"fileData": 0});
    if (folders || files){
        return NextResponse.json({folders, files})
    }


}