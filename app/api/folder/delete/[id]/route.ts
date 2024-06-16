// Import des modules nécessaires
import { NextRequest, NextResponse } from 'next/server';
import Folder from '@/models/folderModel'; // Assurez-vous que le chemin vers votre modèle de dossier est correct
import { connect } from "@/lib/mongo/dbConfig"; 
import { getDataFromToken } from '@/lib/helpers/getDataFromToken';

connect(); // Connexion à MongoDB

// Handler pour la suppression d'un dossier
export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) {
  try {
    // Récupérer l'ID utilisateur à partir du token JWT
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: 'Erreur lors de la vérification du token' }, { status: 401 });
    }

    // Rechercher le dossier par ID et vérifier s'il appartient à l'utilisateur connecté
    const folder = await Folder.findOne({ _id: params.id, userId });

    if (!folder) {
      return NextResponse.json({ error: 'Dossier non trouvé ou non autorisé à être supprimé' }, { status: 404 });
    }

    // Supprimer le dossier de la base de données
    await folder.deleteOne();

    // Répondre avec un message de succès
    return NextResponse.json({ message: 'Dossier supprimé avec succès' }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la suppression du dossier', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du dossier' }, { status: 500 });
  }
}
