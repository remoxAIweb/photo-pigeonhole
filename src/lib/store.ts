
import { create } from 'zustand';

// Types
export interface Photo {
  id: string;
  url: string;
  name: string;
  date: Date;
  folderId: string;
}

export interface Folder {
  id: string;
  name: string;
  cover?: string;
  date: Date;
}

interface PhotoStore {
  folders: Folder[];
  photos: Photo[];
  
  // Actions
  addFolder: (name: string) => void;
  addPhoto: (photo: Omit<Photo, 'id' | 'date'>) => void;
  deleteFolder: (id: string) => void;
  deletePhoto: (id: string) => void;
}

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Create the store
export const usePhotoStore = create<PhotoStore>((set) => ({
  folders: [
    { id: '1', name: 'Vacances', cover: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', date: new Date(2023, 6, 15) },
    { id: '2', name: 'Famille', cover: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', date: new Date(2023, 8, 22) },
    { id: '3', name: 'Travail', cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', date: new Date(2023, 10, 5) },
  ],
  photos: [
    { id: '1', name: 'Photo 1', url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', date: new Date(2023, 6, 15), folderId: '1' },
    { id: '2', name: 'Photo 2', url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', date: new Date(2023, 6, 16), folderId: '1' },
    { id: '3', name: 'Photo 3', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475', date: new Date(2023, 8, 22), folderId: '2' },
    { id: '4', name: 'Photo 4', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', date: new Date(2023, 10, 5), folderId: '3' },
    { id: '5', name: 'Photo 5', url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d', date: new Date(2023, 10, 6), folderId: '3' },
  ],
  
  addFolder: (name) => set((state) => {
    const newFolder = { 
      id: generateId(), 
      name, 
      date: new Date() 
    };
    return { folders: [...state.folders, newFolder] };
  }),
  
  addPhoto: (photo) => set((state) => {
    const newPhoto = { 
      ...photo, 
      id: generateId(), 
      date: new Date() 
    };
    return { photos: [...state.photos, newPhoto] };
  }),
  
  deleteFolder: (id) => set((state) => ({
    folders: state.folders.filter(folder => folder.id !== id),
    // Also delete any photos in that folder
    photos: state.photos.filter(photo => photo.folderId !== id)
  })),
  
  deletePhoto: (id) => set((state) => ({
    photos: state.photos.filter(photo => photo.id !== id)
  })),
}));
