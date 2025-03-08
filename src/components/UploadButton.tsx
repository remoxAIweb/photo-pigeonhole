
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { usePhotoStore } from '@/lib/store';
import { Upload } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface UploadButtonProps {
  folderId: string;
}

const UploadButton = ({ folderId }: UploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addPhoto } = usePhotoStore();
  
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Process each file
    Array.from(files).forEach((file) => {
      // In a real app, you would upload the file to a server
      // and get a URL back. For this demo, we're creating a local URL.
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          // Add the photo to our store
          addPhoto({
            url: e.target.result as string,
            name: file.name,
            folderId: folderId
          });
          
          toast({
            title: "Photo ajoutée",
            description: `${file.name} a été ajouté au dossier.`,
            variant: "default",
          });
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Reset the input and uploading state
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsUploading(false);
  };
  
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        multiple
        className="hidden"
        id="photo-upload"
      />
      <Button 
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="group"
      >
        <Upload className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-1" />
        {isUploading ? 'Chargement...' : 'Ajouter des photos'}
      </Button>
    </div>
  );
};

export default UploadButton;
