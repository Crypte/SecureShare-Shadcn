import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { connect } from "@/lib/mongo/dbConfig"; 
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import File from "@/models/fileModel";

connect()


export async function GET(request: NextRequest, { params }: { params: { id: string }}){

    const userId = await getDataFromToken(request);

    if(userId==null){
        return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
    }

    const file = await File.findById(params.id);
    var headers = new Headers()
    headers.set('Content-Type', file!.fileType!);
    headers.set('Content-Disposition', `attachment; filename=${file.fileName}`);

    if (file){
        return new NextResponse(file.fileData, { status: 200, statusText: "OK", headers });
    }


}