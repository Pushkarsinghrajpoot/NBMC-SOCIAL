'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CompareTable } from '@/components/compare/CompareTable';
import { CompareChart } from '@/components/charts/CompareChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Trophy } from 'lucide-react';
import { toast } from 'sonner';

export default function ComparePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trackedPages, setTrackedPages] = useState<any[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [compareData, setCompareData] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (selectedPages.length > 0) {
      loadCompareData();
    }
  }, [selectedPages]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/');
      return;
    }

    setUser(user);
    await loadPages(user.id);
  };

  const loadPages = async (userId: string) => {
    setLoading(true);
    try {
      const { data: pages, error } = await supabase
        .from('tracked_pages')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      setTrackedPages(pages || []);
      
      if (pages && pages.length >= 2) {
        setSelectedPages(pages.slice(0, 3).map((p: any) => p.page_id));
      }
    } catch (error) {
      console.error('Error loading pages:', error);
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  const loadCompareData = async () => {
    try {
      const metricsPromises = selectedPages.map(async (pageId) => {
        const page = trackedPages.find(p => p.page_id === pageId);
        
        const { data: posts } = await supabase
          .from('page_posts')
          .select('*')
          .eq('page_id', pageId)
          .order('created_time', { ascending: false });

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const postsThisWeek = posts?.filter((p: any) => 
          p.created_time && new Date(p.created_time) > oneWeekAgo
        ) || [];

        const totalLikes = posts?.reduce((sum: number, p: any) => sum + p.likes_count, 0) || 0;
        const totalComments = posts?.reduce((sum: number, p: any) => sum + p.comments_count, 0) || 0;
        const totalEngagement = posts?.reduce((sum: number, p: any) => 
          sum + p.likes_count + p.comments_count + p.shares_count, 0
        ) || 0;

        return {
          pageId,
          pageName: page?.page_name || '',
          followers: page?.followers_count || 0,
          postsThisWeek: postsThisWeek.length,
          avgLikes: posts && posts.length > 0 ? Math.round(totalLikes / posts.length) : 0,
          avgComments: posts && posts.length > 0 ? Math.round(totalComments / posts.length) : 0,
          engagementRate: page?.followers_count && posts && posts.length > 0
            ? (totalEngagement / posts.length / page.followers_count) * 100
            : 0,
        };
      });

      const metrics = await Promise.all(metricsPromises);

      const insightsPromises = selectedPages.map(async (pageId) => {
        const { data: insights } = await supabase
          .from('page_insights')
          .select('*')
          .eq('page_id', pageId)
          .order('recorded_date', { ascending: true })
          .limit(30);

        return { pageId, insights: insights || [] };
      });

      const insightsData = await Promise.all(insightsPromises);

      const allDates = new Set<string>();
      insightsData.forEach(({ insights }) => {
        insights.forEach((insight: any) => {
          allDates.add(insight.recorded_date);
        });
      });

      const sortedDates = Array.from(allDates).sort();

      const chartData = sortedDates.map(date => {
        const dataPoint: any = {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        };

        selectedPages.forEach(pageId => {
          const pageInsights = insightsData.find(d => d.pageId === pageId)?.insights || [];
          const insight = pageInsights.find((i: any) => i.recorded_date === date);
          dataPoint[pageId] = insight?.followers_count || 0;
        });

        return dataPoint;
      });

      const pages = selectedPages.map((pageId, idx) => {
        const page = trackedPages.find(p => p.page_id === pageId);
        const colors = ['#1E5AA8', '#22C55E', '#EF4444'];
        return {
          id: pageId,
          name: page?.page_name || '',
          color: colors[idx] || '#888',
        };
      });

      setCompareData({
        metrics,
        chartData,
        pages,
      });
    } catch (error) {
      console.error('Error loading compare data:', error);
      toast.error('Failed to load comparison data');
    }
  };

  const togglePage = (pageId: string) => {
    if (selectedPages.includes(pageId)) {
      if (selectedPages.length > 1) {
        setSelectedPages(selectedPages.filter(id => id !== pageId));
      }
    } else {
      if (selectedPages.length < 3) {
        setSelectedPages([...selectedPages, pageId]);
      } else {
        toast.info('You can compare up to 3 pages at a time');
      }
    }
  };

  const bestPerformer = compareData?.metrics.reduce((best: any, current: any) => 
    current.engagementRate > best.engagementRate ? current : best
  );

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-12 w-64 mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (trackedPages.length < 2) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button variant="ghost" onClick={() => router.push('/dashboard')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Card className="p-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Not Enough Pages to Compare</h2>
            <p className="text-muted-foreground">
              You need at least 2 tracked pages to use the comparison feature
            </p>
            <Button onClick={() => router.push('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" onClick={() => router.push('/dashboard')} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <h1 className="text-4xl font-bold mb-8">Competitor Comparison</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Pages to Compare (up to 3)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {trackedPages.map((page) => (
              <Button
                key={page.page_id}
                variant={selectedPages.includes(page.page_id) ? 'default' : 'outline'}
                onClick={() => togglePage(page.page_id)}
              >
                {page.page_name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {bestPerformer && (
        <Card className="mb-6 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Best Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{bestPerformer.pageName}</h3>
                <p className="text-muted-foreground">
                  {bestPerformer.followers.toLocaleString()} followers
                </p>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                {bestPerformer.engagementRate.toFixed(2)}% engagement rate
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {compareData && (
        <div className="space-y-6">
          <CompareTable pages={compareData.metrics} />
          
          {compareData.chartData.length > 0 && (
            <CompareChart data={compareData.chartData} pages={compareData.pages} />
          )}
        </div>
      )}
    </div>
  );
}
