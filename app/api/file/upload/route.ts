import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import File from '@/models/fileModel'; // Assurez-vous que le chemin est correct et que le fichier est bien un .ts
import { connect } from "@/lib/mongo/dbConfig"; 
import { getDataFromToken } from '@/lib/helpers/getDataFromToken';

connect()
// POST handler
export async function POST(request: NextRequest) {
  await connect();

  const user_id = await getDataFromToken(request)
  if(user_id==null){
    return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
}
  const formData = await request.formData();

  const file = formData.get('file') as File;
  const fileName = (formData.get('fileName') as string).replace(/\s+/g, '_');
  const fileType = formData.get('fileType') as string;
  const folderId = formData.get('folderId') as string;
  const userId = formData.get('userId') as string;

  if (!file || !fileName || !fileType || !folderId || !userId) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const newFile = new File({
    fileName,
    fileType,
    fileData: buffer,
    folderId,
    userId
  });

  try {
    const savedFile = await newFile.save();
    return NextResponse.json({
      message: "File uploaded successfully",
      success: true,
      savedFile
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error uploading file",
      
    }, { status: 500 });
  }
}
