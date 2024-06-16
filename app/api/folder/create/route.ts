import { NextRequest, NextResponse } from "next/server";
import Folder from "@/models/folderModel";
import jwt from "jsonwebtoken";
import { connect } from "@/lib/mongo/dbConfig"; 
import { getDataFromToken } from "@/lib/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  if(!searchParams.get("folderId")){
    var folderId = "yolo"
  } else {
    var folderId = searchParams.get('folderId')!;
  }
  

  const userId = await getDataFromToken(request)
  
  
  const newFolderData = await request.json();
  console.log(newFolderData);
  console.log({ folderId });
  console.log(userId);
  
  if (!userId) {
    return NextResponse.json({ error: 'Erreur lors de la vérification du token' }, { status: 400 });
  }

  const newFolder = new Folder({
    name: newFolderData.name,
    userId: userId,
    parentFolderId: folderId,
  });
  console.log(newFolder);

  try {
    const savedFolder = await newFolder.save();
    return new NextResponse(JSON.stringify(savedFolder), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Erreur lors de la création du dossier', error);
    return NextResponse.json({ error: 'Erreur lors de la création du dossier' }, { status: 500 });
  }
}
