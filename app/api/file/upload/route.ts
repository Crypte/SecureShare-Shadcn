import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import File from '@/models/fileModel'; // Assurez-vous que le chemin est correct et que le fichier est bien un .ts

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// POST handler
export async function POST(request: NextRequest) {
  await connectDB();

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
      details: error.message
    }, { status: 500 });
  }
}
