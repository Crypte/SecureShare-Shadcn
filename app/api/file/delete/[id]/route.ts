import { NextRequest, NextResponse } from 'next/server';
import File from '@/models/fileModel'; // Assurez-vous que le chemin vers votre modèle de fichier est correct
import { connect } from "@/lib/mongo/dbConfig";
import { getDataFromToken } from '@/lib/helpers/getDataFromToken';

connect(); // Connexion à MongoDB

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) {
  try {
    // Récupérer l'ID utilisateur à partir du token JWT
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: 'Erreur lors de la vérification du token' }, { status: 401 });
    }

    // Rechercher le fichier par ID et vérifier s'il appartient à l'utilisateur connecté
    const file = await File.findOne({ _id: params.id, userId });

    if (!file) {
      return NextResponse.json({ error: 'Fichier non trouvé ou non autorisé à être supprimé' }, { status: 404 });
    }

    // Supprimer le fichier de la base de données
    await file.deleteOne();

    // Répondre avec un message de succès
    return NextResponse.json({ message: 'Fichier supprimé avec succès' }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la suppression du fichier', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du fichier' }, { status: 500 });
  }
}
