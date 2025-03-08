
import { usePhotoStore } from '@/lib/store';
import FolderItem from './FolderItem';
import CreateFolderButton from './CreateFolderButton';

const FolderGrid = () => {
  const { folders, photos } = usePhotoStore();
  
  // Calculate photo count for each folder
  const getPhotoCount = (folderId: string) => {
    return photos.filter(photo => photo.folderId === folderId).length;
  };
  
  return (
    <div>
      <div className="folder-grid">
        <CreateFolderButton />
        
        {folders.map(folder => (
          <FolderItem 
            key={folder.id} 
            folder={folder} 
            photoCount={getPhotoCount(folder.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FolderGrid;
