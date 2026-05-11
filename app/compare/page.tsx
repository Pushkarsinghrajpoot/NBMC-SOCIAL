'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { CompareTable } from '@/components/compare/CompareTable';
import { CompareChart } from '@/components/charts/CompareChart';
import { BarChart3, Trophy, Users, MessageCircle, TrendingUp, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { dummyTrackedPages, dummyPosts, dummyInsights } from '@/lib/dummyData';
import { AppLayout } from '../components/AppLayout';

function CompareContent() {
  const router = useRouter();
  const [trackedPages, setTrackedPages] = useState<any[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [compareData, setCompareData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bestPerformer, setBestPerformer] = useState<any>(null);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use dummy data
      setTrackedPages(dummyTrackedPages);
      
      if (dummyTrackedPages.length >= 2) {
        setSelectedPages(dummyTrackedPages.slice(0, 3).map((p: any) => p.page_id));
      }
    } catch (error) {
      console.error('Error loading pages:', error);
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPages.length > 0) {
      loadCompareData();
    }
  }, [selectedPages]);

  const loadCompareData = async () => {
    if (selectedPages.length < 2) return;

    try {
      const compareResults = [];

      for (const pageId of selectedPages) {
        // Get page details from dummy data
        const page = dummyTrackedPages.find(p => p.page_id === pageId);
        
        // Get posts from dummy data
        const posts = dummyPosts.filter(p => p.page_id === pageId);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const postsThisWeek = posts.filter((p: any) => 
          p.created_time && new Date(p.created_time) > oneWeekAgo
        );

        const totalLikes = posts.reduce((sum: number, p: any) => sum + p.likes_count, 0);
        const totalComments = posts.reduce((sum: number, p: any) => sum + p.comments_count, 0);
        const totalEngagement = posts.reduce((sum: number, p: any) => 
          sum + p.likes_count + p.comments_count + p.shares_count, 0
        );

        compareResults.push({
          pageId,
          pageName: page?.page_name || '',
          followers: page?.followers_count || 0,
          postsThisWeek: postsThisWeek.length,
          avgLikes: posts.length > 0 ? Math.round(totalLikes / posts.length) : 0,
          avgComments: posts.length > 0 ? Math.round(totalComments / posts.length) : 0,
          engagementRate: page?.followers_count && posts.length > 0 
            ? parseFloat(((totalEngagement / posts.length / page.followers_count) * 100).toFixed(2))
            : 0
        });
      }

      setCompareData(compareResults);

      // Find best performer
      const best = compareResults.reduce((best, current) => {
        return current.engagementRate > best.engagementRate ? current : best;
      });

      setBestPerformer(best);

      // Load chart data
      const chartResults: any[] = [];
      for (const pageId of selectedPages) {
        const insights = dummyInsights.filter(i => i.page_id === pageId);
        
        insights.forEach((insight: any) => {
          const existingDate = chartResults.find(r => r.date === insight.recorded_date);
          if (existingDate) {
            existingDate[pageId] = insight.followers_count || 0;
          } else {
            chartResults.push({
              date: insight.recorded_date,
              [pageId]: insight.followers_count || 0
            });
          }
        });
      }
      setChartData(chartResults);
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
          <CompareTable pages={compareData} />
          {chartData.length > 0 && (
            <CompareChart 
              data={chartData}
              pages={selectedPages.map((pageId, idx) => {
                const page = trackedPages.find(p => p.page_id === pageId);
                const colors = ['#1E5AA8', '#22C55E', '#EF4444'];
                return {
                  id: pageId,
                  name: page?.page_name || '',
                  color: colors[idx] || '#888',
                };
              })}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <AppLayout>
      <CompareContent />
    </AppLayout>
  );
}
