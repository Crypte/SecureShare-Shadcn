import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Folder from "@/models/folderModel";

export async function POST(request: NextRequest, { params }: { params: { folderId: string }}){
  const newFolderData = await request.json();

  const userId = await getDataFromToken(request);

  if(userId==null){
      return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
  }

  const newFolder = new Folder({
    fileName: newFolderData.name,
    fileType: 'folder',
    userId: userId,
    folderId: params.folderId
  });

  try {
    const savedFolder = await newFolder.save();
    return NextResponse.json(savedFolder).headers.set('Content-Type', 'application/json');
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de la création du dossier' }, { status: 500 });
  }
}
