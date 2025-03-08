
import { Link } from 'react-router-dom';
import { Folder } from '@/lib/store';
import { cn } from '@/lib/utils';
import { FolderIcon, Image as ImageIcon } from 'lucide-react';

interface FolderItemProps {
  folder: Folder;
  photoCount: number;
  className?: string;
}

const FolderItem = ({ folder, photoCount, className }: FolderItemProps) => {
  return (
    <Link 
      to={`/folder/${folder.id}`} 
      className={cn(
        'group relative overflow-hidden rounded-xl transition-all duration-300',
        'hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
    >
      <div className="aspect-square overflow-hidden rounded-xl">
        {folder.cover ? (
          <img 
            src={folder.cover} 
            alt={folder.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <FolderIcon className="w-16 h-16 text-muted-foreground/40" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-medium truncate mb-1">{folder.name}</h3>
          <div className="flex items-center text-white/80 text-sm">
            <ImageIcon className="w-4 h-4 mr-1" />
            <span>{photoCount} photos</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FolderItem;
