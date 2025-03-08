
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={cn('flex-1 w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in', className)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
