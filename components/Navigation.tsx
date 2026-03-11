'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { BarChart3, GitCompare, Home, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Bypass authentication with dummy user
    setUser({ id: 'demo-user', email: 'demo@example.com' });
  }, []);

  const handleLogout = async () => {
    // Bypass auth - just redirect to home
    router.push('/');
  };

  if (pathname === '/' || pathname === '/demo') {
    return null;
  }

  if (!user) {
    return <div className="h-16 border-b"></div>;
  }

  return (
    <nav className="border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <span>NBMC Analytics</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === '/dashboard' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/analytics" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === '/analytics' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                Analytics
              </Link>
              <Link 
                href="/insights" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === '/insights' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                Insights
              </Link>
              <Link 
                href="/reports" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === '/reports' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                Reports
              </Link>
              <Link 
                href="/monitoring" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === '/monitoring' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                Monitor
              </Link>
              <Link 
                href="/compare" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === '/compare' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                Compare
              </Link>
              <Link 
                href="/settings" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === '/settings' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                Settings
              </Link>
              <Link 
                href="/privacy" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === '/privacy' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                Privacy
              </Link>
            </nav>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                {user.email || 'User Account'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
