'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  BarChart3, 
  Calendar,
  Filter,
  Download,
  Eye,
  Heart,
  Share2,
  Clock,
  Target,
  Zap,
  Activity,
  PieChart,
  LineChart,
  AreaChart
} from 'lucide-react';
import { toast } from 'sonner';
import { dummyTrackedPages, dummyPosts, dummyComments, dummyInsights } from '@/lib/dummyData';
import { AppLayout } from '../components/AppLayout';

function AnalyticsContent() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('engagement');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg text-gray-600">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  const calculateMetrics = () => {
    const totalFollowers = dummyTrackedPages.reduce((sum, page) => sum + page.followers_count, 0);
    const totalPosts = dummyPosts.length;
    const totalEngagement = dummyPosts.reduce((sum, post) => sum + post.likes_count + post.comments_count + post.shares_count, 0);
    const avgEngagementRate = totalPosts > 0 ? (totalEngagement / totalPosts / totalFollowers) * 100 : 0;
    const totalComments = dummyComments.length;
    const positiveComments = dummyComments.filter(c => c.sentiment === 'positive').length;
    const sentimentScore = totalComments > 0 ? (positiveComments / totalComments) * 100 : 0;

    return {
      totalFollowers,
      totalPosts,
      totalEngagement,
      avgEngagementRate,
      totalComments,
      sentimentScore,
      growthRate: 12.5, // Dummy growth rate
      topPerformingPage: dummyTrackedPages.reduce((best, current) => 
        current.followers_count > best.followers_count ? current : best
      )
    };
  };

  const metrics = calculateMetrics();

  const getEngagementData = () => {
    return dummyPosts.slice(0, 10).map((post, index) => ({
      name: `Post ${index + 1}`,
      engagement: post.likes_count + post.comments_count + post.shares_count,
      likes: post.likes_count,
      comments: post.comments_count,
      shares: post.shares_count,
      page: post.page_id
    }));
  };

  const getFollowerGrowthData = () => {
    return dummyInsights
      .filter(insight => insight.page_id === 'coca-cola')
      .map(insight => ({
        date: insight.recorded_date,
        followers: insight.followers_count
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getSentimentData = () => {
    const positive = dummyComments.filter(c => c.sentiment === 'positive').length;
    const neutral = dummyComments.filter(c => c.sentiment === 'neutral').length;
    const negative = dummyComments.filter(c => c.sentiment === 'negative').length;
    
    return [
      { name: 'Positive', value: positive, color: '#22c55e' },
      { name: 'Neutral', value: neutral, color: '#64748b' },
      { name: 'Negative', value: negative, color: '#ef4444' }
    ];
  };

  const getTopPages = () => {
    return dummyTrackedPages
      .map(page => {
        const pagePosts = dummyPosts.filter(p => p.page_id === page.page_id);
        const totalEngagement = pagePosts.reduce((sum, post) => 
          sum + post.likes_count + post.comments_count + post.shares_count, 0
        );
        return {
          ...page,
          totalEngagement,
          avgEngagement: pagePosts.length > 0 ? totalEngagement / pagePosts.length : 0
        };
      })
      .sort((a, b) => b.totalEngagement - a.totalEngagement)
      .slice(0, 5);
  };

  const getHourlyEngagement = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => ({
      hour: `${hour}:00`,
      engagement: Math.floor(Math.random() * 1000) + 100,
      posts: Math.floor(Math.random() * 10) + 1
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Multi-Dimensional Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights across all tracked pages</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalFollowers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{metrics.growthRate}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              Across {dummyTrackedPages.length} pages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgEngagementRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalEngagement.toLocaleString()} total interactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.sentimentScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Positive sentiment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Dashboard */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getEngagementData().slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {item.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {item.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" />
                          {item.shares}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getTopPages().map((page, index) => (
                    <div key={page.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <div>
                          <p className="font-medium">{page.page_name}</p>
                          <p className="text-sm text-muted-foreground">{page.followers_count.toLocaleString()} followers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{page.totalEngagement.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">total engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span>Avg Likes per Post</span>
                    <span className="font-bold">{Math.round(metrics.totalEngagement / metrics.totalPosts / 3)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg Comments per Post</span>
                    <span className="font-bold">{Math.round(metrics.totalEngagement / metrics.totalPosts / 3)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg Shares per Post</span>
                    <span className="font-bold">{Math.round(metrics.totalEngagement / metrics.totalPosts / 3)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Best Performing Hour</span>
                    <span className="font-bold">2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Best Performing Day</span>
                    <span className="font-bold">Wednesday</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <PieChart className="w-16 h-16 mx-auto mb-4" />
                    <p>Engagement distribution chart</p>
                    <p className="text-sm">Likes, Comments, Shares breakdown</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <LineChart className="w-16 h-16 mx-auto mb-4" />
                  <p>Follower growth over time</p>
                  <p className="text-sm">Historical growth data for all pages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getSentimentData().map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="capitalize">{item.name}</span>
                      </div>
                      <Badge variant="outline">{item.value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dummyComments.slice(0, 5).map((comment) => (
                    <div key={comment.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{comment.commenter_name}</p>
                          <p className="text-sm mt-1">{comment.message}</p>
                        </div>
                        <Badge 
                          variant={comment.sentiment === 'positive' ? 'default' : 
                                  comment.sentiment === 'negative' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {comment.sentiment}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimal Posting Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Activity className="w-16 h-16 mx-auto mb-4" />
                  <p>Hourly engagement patterns</p>
                  <p className="text-sm">Best times to post for maximum reach</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Page Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                  <p>Side-by-side page comparison</p>
                  <p className="text-sm">Compare metrics across multiple pages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <AnalyticsContent />
    </AppLayout>
  );
}
