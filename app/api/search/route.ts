import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { connect } from "@/lib/mongo/dbConfig"; 
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import File from "@/models/fileModel";
import Folder from "@/models/folderModel";

connect()


export async function GET(request: NextRequest){
    const userId = await getDataFromToken(request);
    var {search} = await request.json()
    if(userId==null){
        return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
    }
    if(search){
        var files = await File.find({"fileName": {"$regex": search, "$options": "i"}, "userId": userId}).select({"fileData":0});
        var folders = await Folder.find({name: { $regex: search, $options: 'i' },"userId": userId});
    } else {
        var files = await File.find({"userId": userId}).select({"fileData": 0});
        var folders = await Folder.find({"userId": userId});
    }

    return NextResponse.json({files, folders}).headers.set('Content-Type', 'application/json');
}