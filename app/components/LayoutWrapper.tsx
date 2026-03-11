'use client';

import { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { NavigationWrapper } from './NavigationWrapper';
import { ClientOnly } from './ClientOnly';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <div className="h-16 border-b"></div>
        <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 4rem)' }}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavigationWrapper />
      {children}
      <ClientOnly>
        <Toaster />
      </ClientOnly>
    </>
  );
}
