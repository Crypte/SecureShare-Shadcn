import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { connect } from "@/lib/mongo/dbConfig"; 
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import File from "@/models/fileModel";
import Folder from "@/models/folderModel";

connect()


export async function GET(request: NextRequest){

    const userId = await getDataFromToken(request);

    if(userId==null){
        return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
    }

    const folders = await Folder.find({"userId": userId, "parentFolderId": "yolo"});
    if (folders){
        return NextResponse.json({folders})
    }


}