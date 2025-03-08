
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePhotoStore } from '@/lib/store';
import { FolderPlus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const CreateFolderButton = () => {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const { addFolder } = usePhotoStore();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!folderName.trim()) {
      toast({
        title: "Nom requis",
        description: "Veuillez saisir un nom pour le dossier.",
        variant: "destructive",
      });
      return;
    }
    
    addFolder(folderName);
    setFolderName('');
    setOpen(false);
    
    toast({
      title: "Dossier créé",
      description: `Le dossier "${folderName}" a été créé avec succès.`,
      variant: "default",
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="aspect-square flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background hover:bg-secondary/50 transition-colors duration-300"
        >
          <FolderPlus className="w-8 h-8 text-primary mb-2" />
          <span className="text-sm font-medium">Nouveau dossier</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Créer un nouveau dossier</DialogTitle>
            <DialogDescription>
              Entrez un nom pour votre nouveau dossier photo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                className="col-span-3"
                autoFocus
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Créer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderButton;
