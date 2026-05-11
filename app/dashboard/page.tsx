'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageCard } from '@/components/pages/PageCard';
import { AddPageModal } from '@/components/pages/AddPageModal';
import { EngagementChart } from '@/components/charts/EngagementChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, TrendingUp, FileText, RefreshCw, ChevronRight, Phone, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { dummyTrackedPages, dummyPosts } from '@/lib/dummyData';
import { AppLayout } from '../components/AppLayout';
import Link from 'next/link';
import { Badge } from '@/components/ui/customBadge';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

function DashboardContent() {
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
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // Bypass authentication with dummy user
    const user = { id: 'demo-user' };
    
    if (!user) {
      router.push('/');
      return;
    }

    setUser(user);
    await loadData();
  };

  const loadData = async () => {
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use dummy data
      setTrackedPages(dummyTrackedPages);

      // Calculate stats from dummy data
      const totalEngagement = dummyPosts.reduce((sum: number, post: any) => 
        sum + post.likes_count + post.comments_count + post.shares_count, 0
      );

      setStats({
        totalPages: dummyTrackedPages.length,
        totalPosts: dummyPosts.length,
        avgEngagement: dummyPosts.length > 0 ? Math.round(totalEngagement / dummyPosts.length) : 0,
      });

      // Create chart data from recent posts
      const chartData = dummyPosts.slice(0, 10).reverse().map((post: any, idx: number) => ({
        name: `Post ${idx + 1}`,
        likes: post.likes_count,
        comments: post.comments_count,
        shares: post.shares_count,
      }));

      setRecentEngagement(chartData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (!user) return;
    
    setSyncing(true);
    try {
      // Simulate sync
      toast.loading('Syncing pages...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('All pages synced successfully');
      await loadData();
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Failed to sync pages');
    } finally {
      setSyncing(false);
    }
  };

  const onPageAdded = () => {
    loadData();
    setShowAddModal(false);
    toast.success('Page added successfully');
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
              onPageAdded={onPageAdded}
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
                onPageAdded={onPageAdded}
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

function WhatsAppStatusBanner() {
  const { phoneConnected, phoneNumber } = useApp();

  return (
    <div
      className={cn(
        " container mx-auto my-4 rounded-2xl border p-5 flex items-start justify-between gap-4 " ,
        phoneConnected
          ? "bg-emerald-50 border-emerald-200/80"
          : "bg-amber-50 border-amber-200/80"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
            phoneConnected ? "bg-emerald-100" : "bg-amber-100"
          )}
        >
          {phoneConnected ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <Phone className="w-5 h-5 text-amber-600" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm text-[#111]">
              {phoneConnected ? "WhatsApp Connected" : "WhatsApp Not Connected"}
            </p>
            <Badge variant={phoneConnected ? "green" : "yellow"} dot>
              {phoneConnected ? "Active" : "Pending setup"}
            </Badge>
          </div>
          {phoneConnected && phoneNumber ? (
            <p className="text-xs text-[#666] mt-0.5">
              Connected number:{" "}
              <span className="font-mono text-[#111]">{phoneNumber}</span>
            </p>
          ) : (
            <p className="text-xs text-[#666] mt-0.5">
              Connect your WhatsApp to start receiving brand updates
            </p>
          )}
        </div>
      </div>
      {!phoneConnected && (
        <Link href="/settings">
          <Button variant="outline" size="sm" className="shrink-0">
            Connect
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppLayout>
      <WhatsAppStatusBanner  />
      <DashboardContent />
    </AppLayout>
  );
}
