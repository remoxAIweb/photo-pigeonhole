
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PhotoGrid from '@/components/PhotoGrid';
import UploadButton from '@/components/UploadButton';
import { usePhotoStore } from '@/lib/store';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from '@/components/ui/use-toast';

const Folder = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();
  const { folders, photos, deleteFolder } = usePhotoStore();
  
  const folder = folders.find(f => f.id === folderId);
  const folderPhotos = photos.filter(p => p.folderId === folderId);
  
  useEffect(() => {
    // Redirect if folder doesn't exist
    if (folderId && !folder) {
      navigate('/');
      toast({
        title: "Dossier introuvable",
        description: "Le dossier que vous cherchez n'existe pas.",
        variant: "destructive",
      });
    }
  }, [folder, folderId, navigate]);
  
  const handleDeleteFolder = () => {
    if (folderId) {
      deleteFolder(folderId);
      navigate('/');
      toast({
        title: "Dossier supprimé",
        description: `Le dossier "${folder?.name}" et toutes ses photos ont été supprimés.`,
        variant: "default",
      });
    }
  };
  
  if (!folder) return null;
  
  return (
    <Layout>
      <div className="space-y-8 animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Link 
                to="/" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <h1 className="text-3xl font-bold tracking-tight">{folder.name}</h1>
            </div>
            <p className="text-muted-foreground">
              {folderPhotos.length} photo{folderPhotos.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Toutes les photos dans ce dossier seront définitivement supprimées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteFolder} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <UploadButton folderId={folderId} />
          </div>
        </div>
        
        {folderPhotos.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-background">
            <h2 className="text-xl font-medium">Aucune photo</h2>
            <p className="mt-2 text-muted-foreground">
              Ajoutez des photos à ce dossier pour commencer.
            </p>
            <div className="mt-4">
              <UploadButton folderId={folderId} />
            </div>
          </div>
        ) : (
          <PhotoGrid photos={folderPhotos} />
        )}
      </div>
    </Layout>
  );
};

export default Folder;
