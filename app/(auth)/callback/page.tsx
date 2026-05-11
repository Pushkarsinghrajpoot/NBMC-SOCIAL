'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth error:', error);
        router.push('/?error=auth_failed');
        return;
      }

      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Callback error:', error);
      router.push('/?error=callback_failed');
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <p className="text-center text-muted-foreground">
          Completing authentication...
        </p>
      </div>
    </div>
  );
}
