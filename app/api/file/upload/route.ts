import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import File from "@/models/fileModel";

export async function POST(request: NextRequest){
    const formData = await request.formData();

    console.log(formData.getAll('files').length)

    const file = formData.get("file") as File;
    var filename = formData.get("filename") as String;
    filename =  filename.replaceAll(" ", "_");
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileToSave = new File({
        fileName: filename,
        fileType: file.type,
        fileData: buffer,
        folderId: formData.get('folderId'),
        userId: formData.get('userId')
    })

    

    const savedFile = await fileToSave.save();
    console.log(filename);
    return NextResponse.json({
        message: "File added successfully",
        success: true,
        savedFile
    })
};