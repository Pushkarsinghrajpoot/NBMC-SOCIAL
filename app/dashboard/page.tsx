'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PageCard } from '@/components/pages/PageCard';
import { AddPageModal } from '@/components/pages/AddPageModal';
import { EngagementChart } from '@/components/charts/EngagementChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, TrendingUp, FileText, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [trackedPages, setTrackedPages] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalPages: 0,
    totalPosts: 0,
    avgEngagement: 0,
  });
  const [recentEngagement, setRecentEngagement] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/');
      return;
    }

    setUser(user);
    await loadDashboardData(user.id);
  };

  const loadDashboardData = async (userId: string) => {
    setLoading(true);
    try {
      const { data: pages, error } = await supabase
        .from('tracked_pages')
        .select('*')
        .eq('user_id', userId)
        .order('added_at', { ascending: false });

      if (error) throw error;

      setTrackedPages(pages || []);

      if (pages && pages.length > 0) {
        const pageIds = pages.map((p: any) => p.page_id);
        
        const { data: posts, error: postsError } = await supabase
          .from('page_posts')
          .select('*')
          .in('page_id', pageIds)
          .order('created_time', { ascending: false })
          .limit(100);

        if (!postsError && posts) {
          const totalEngagement = posts.reduce((sum: number, post: any) => 
            sum + post.likes_count + post.comments_count + post.shares_count, 0
          );

          setStats({
            totalPages: pages.length,
            totalPosts: posts.length,
            avgEngagement: posts.length > 0 ? Math.round(totalEngagement / posts.length) : 0,
          });

          const chartData = posts.slice(0, 10).reverse().map((post: any, idx: number) => ({
            name: `Post ${idx + 1}`,
            likes: post.likes_count,
            comments: post.comments_count,
            shares: post.shares_count,
          }));

          setRecentEngagement(chartData);
        }
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (!user) return;
    
    setSyncing(true);
    try {
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Pages synced successfully!');
        await loadDashboardData(user.id);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Failed to sync pages');
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleSync}
            disabled={syncing || trackedPages.length === 0}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync All'}
          </Button>
          {user && (
            <AddPageModal 
              userId={user.id} 
              onPageAdded={() => loadDashboardData(user.id)}
            />
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pages Tracked</CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Posts Analyzed</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgEngagement}</div>
          </CardContent>
        </Card>
      </div>

      {recentEngagement.length > 0 && (
        <div className="mb-8">
          <EngagementChart data={recentEngagement} />
        </div>
      )}

      {trackedPages.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">No Pages Tracked Yet</h2>
            <p className="text-muted-foreground">
              Start tracking Facebook pages to see analytics and insights
            </p>
            {user && (
              <AddPageModal 
                userId={user.id} 
                onPageAdded={() => loadDashboardData(user.id)}
              />
            )}
          </div>
        </Card>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tracked Pages</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trackedPages.map((page) => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
