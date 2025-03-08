
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FolderIcon } from 'lucide-react';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  return (
    <nav className={cn('w-full px-6 py-4 bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50', className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-all duration-300 hover:opacity-80"
        >
          <FolderIcon className="w-6 h-6 text-primary" />
          <span className="font-medium text-lg tracking-tight">PhotoPigeonhole</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Dossiers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
