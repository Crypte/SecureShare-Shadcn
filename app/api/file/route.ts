import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { connect } from "@/lib/mongo/dbConfig"; 
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import File from "@/models/fileModel";

connect()


export async function GET(request: NextRequest, { params }: { params: { id: string }}){
    const formData = await request.formData();

    const userId = await getDataFromToken(request);

    if(userId==null){
        return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
    }

    const fileRetrieved = await File.findById(params.id);
    var resp = new NextResponse(); 
    resp.headers.set('Content-Type', fileRetrieved!.fileType!);

    if (fileRetrieved){
        return NextResponse.json(fileRetrieved);
    }


}