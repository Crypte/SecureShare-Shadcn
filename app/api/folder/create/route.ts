import { NextRequest, NextResponse } from "next/server";
import Folder from "@/models/folderModel";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folderId = searchParams.get('folderId');
  
  const newFolderData = await request.json();
  console.log(newFolderData);
  console.log({ folderId });

  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: 'Token non fourni' }, { status: 400 });
  }

  let decodedToken: any;
  try {
    decodedToken = jwt.decode(token);
  } catch (error) {
    console.error('Invalid token', error);
    return NextResponse.json({ error: 'Token invalide' }, { status: 400 });
  }

  const userId = decodedToken?.userId;
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
