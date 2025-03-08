
import { usePhotoStore, Photo } from '@/lib/store';
import PhotoItem from './PhotoItem';
import { toast } from '@/components/ui/use-toast';

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid = ({ photos }: PhotoGridProps) => {
  const { deletePhoto } = usePhotoStore();
  
  const handleDelete = (id: string) => {
    deletePhoto(id);
    toast({
      title: "Photo supprimée",
      description: "La photo a été supprimée avec succès.",
      variant: "default",
    });
  };
  
  return (
    <div className="photo-grid">
      {photos.map(photo => (
        <PhotoItem 
          key={photo.id} 
          photo={photo} 
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
