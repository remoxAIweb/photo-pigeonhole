
import { Photo } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface PhotoItemProps {
  photo: Photo;
  className?: string;
  onDelete?: (id: string) => void;
}

const PhotoItem = ({ photo, className, onDelete }: PhotoItemProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div 
      className={cn(
        'group relative overflow-hidden rounded-xl transition-all duration-300',
        'hover:shadow-lg hover:scale-[1.02] focus:outline-none',
        className
      )}
    >
      <div className="aspect-square overflow-hidden rounded-xl bg-secondary/50">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        <img 
          src={photo.url} 
          alt={photo.name} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
            !isLoaded && "opacity-0",
            isLoaded && "opacity-100"
          )}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-medium truncate">{photo.name}</h3>
          <p className="text-white/80 text-sm">
            {photo.date.toLocaleDateString()}
          </p>
        </div>
        
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(photo.id);
            }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500"
            aria-label="Delete photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoItem;
