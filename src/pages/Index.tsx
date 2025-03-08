
import Layout from '@/components/Layout';
import FolderGrid from '@/components/FolderGrid';
import { usePhotoStore } from '@/lib/store';

const Index = () => {
  const { folders } = usePhotoStore();
  
  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Mes Dossiers</h1>
          <p className="text-muted-foreground">
            Organisez vos photos en dossiers pour les retrouver facilement.
          </p>
        </div>
        
        {folders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-muted-foreground">Aucun dossier créé</h2>
            <p className="mt-2 text-muted-foreground">
              Commencez par créer un nouveau dossier pour organiser vos photos.
            </p>
          </div>
        ) : (
          <FolderGrid />
        )}
      </div>
    </Layout>
  );
};

export default Index;
